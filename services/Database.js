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
      await pool.query("SELECT 1"); // simple query
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
      "SELECT * FROM tenants WHERE id = $1",
      [tenantId]
    );

    if (rows.length === 0) throw new Error("Tenant not found");
    const tenant = rows[0];

    let connectionString;
    if (tenant.databaseName === "hospital_a") {
      connectionString = env.db_url_hospital_a;
    } else if (tenant.databaseName === "hospital_b") {
      connectionString = env.db_url_hospital_b;
    } else {
      throw new Error("Unknown tenant database");
    }

    const pool = new Pool({ connectionString });
    await this.testTenantConnection(pool);

    this.tenantPools.set(tenantId, pool);
    return pool;
  }
}

export default new DbService();
