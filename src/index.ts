import express from "express";
import env from "./utils/env.js";
import router from "./routing/routes.js";
import { IdentityDataSource } from "./services/Datasource/IdentityDatasource.js";
import TenantDataSourceManager from "./services/Datasource/TenantDataSourceManager.js";

const app = express();
app.use(express.json());
app.use(router);

await IdentityDataSource.initialize();
console.log("Identity DB connected ✅");

app.listen(env.port || 3000, () => {
  console.log(`Server running on port ${env.port || 3000}`);
});

process.on("SIGINT", async () => {
  console.log("Closing all DB connections...");
  await TenantDataSourceManager.closeAll();
  await IdentityDataSource.destroy();
  process.exit(0);
});