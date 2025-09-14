// ./services/TenantDataSourceManager.js
import { DataSource } from "typeorm";
import { User } from "../../entities/User.js";
import { MedicalRecord } from "../../entities/MedicalRecord.js";
import { IdentityDataSource } from "./IdentityDatasource.js";

class TenantDataSourceManager {
  constructor() {
    this.dataSources = new Map();
  }

  async getDataSource(tenantId) {
    if (this.dataSources.has(tenantId)) return this.dataSources.get(tenantId);

    const tenantRepo = IdentityDataSource.getRepository("Tenant");
    const tenant = await tenantRepo.findOneBy({ id: tenantId });
    if (!tenant) throw new Error("Tenant not found");

    const dataSource = new DataSource({
      type: "postgres",
      url: tenant.databaseConnectionString,
      entities: [User, MedicalRecord],
      synchronize: false,
    });

    await dataSource.initialize();
    this.dataSources.set(tenantId, dataSource);
    return dataSource;
  }

  async closeAll() {
    for (const ds of this.dataSources.values()) await ds.destroy();
    this.dataSources.clear();
  }
}

export default new TenantDataSourceManager();
