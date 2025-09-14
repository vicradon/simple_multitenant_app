import pkg from "pg";
import env from "../utils/env.js";

const { Pool } = pkg;

class DbService {
  constructor() {
    this.identityDb = new Pool({
      connectionString: env.db_url_identity,
    });
    this.tenantPools = new Map();
  }

  async testTenantConnection(pool) {
    try {
      await pool.query("SELECT 1");
      console.log("Tenant DB connection verified ✅");
    } catch (err) {
      console.error("Tenant DB connection failed ❌", err.message);
      throw new Error("Unable to connect to tenant database");
    }
  }

  async getTenantPool(tenantId) {
    if (this.tenantPools.has(tenantId)) {
      return this.tenantPools.get(tenantId);
    }

    const { rows } = await this.identityDb.query(
      "SELECT id, database_connection_string FROM tenants WHERE id = $1",
      [tenantId]
    );

    if (rows.length === 0) {
      throw new Error("Tenant not found");
    }

    const tenant = rows[0];
    if (!tenant.database_connection_string) {
      throw new Error(`No connection string configured for tenant ${tenantId}`);
    }

    const pool = new Pool({ connectionString: tenant.database_connection_string });
    await this.testTenantConnection(pool);

    this.tenantPools.set(tenantId, pool);
    return pool;
  }

  async closeAllPools() {
    await this.identityDb.end();

    for (const pool of this.tenantPools.values()) {
      await pool.end();
    }
    this.tenantPools.clear();
    console.log("All DB pools closed ✅");
  }
}

export default new DbService();
