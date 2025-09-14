import express from "express";
import env from "./utils/env.js";
import router from "./routing/routes.js";

const app = express();
app.use(express.json());
app.use(router);

app.listen(env.port || 3000, () => {
  console.log(`Server running on port ${env.port || 3000}`);
});
