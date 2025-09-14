import express from "express";
import env from "./utils/env";
import router from "./routing/routes";
import { IdentityDataSource } from "./services/Datasource/IdentityDatasource";
import TenantDataSourceManager from "./services/Datasource/TenantDataSourceManager";

const app = express();
app.use(express.json());
app.use(router);

async function main() {
  try {
    await IdentityDataSource.initialize();
    console.log("Identity DB connected ✅");

    const port = env.port || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    process.on("SIGINT", async () => {
      console.log("Closing all DB connections...");
      await TenantDataSourceManager.closeAll();
      await IdentityDataSource.destroy();
      process.exit(0);
    });
  } catch (err: any) {
    console.error("Failed to start app:", err);
    process.exit(1);
  }
}

main();
