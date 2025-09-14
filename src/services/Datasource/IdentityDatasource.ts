import { DataSource } from "typeorm";
import env from "../../utils/env.js";
import { Tenant } from "../../entities/Tenant.js";

export const IdentityDataSource = new DataSource({
  type: "postgres",
  url: env.db_url_identity,
  entities: [Tenant],
  synchronize: true, 
});
