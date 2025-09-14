import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default {
  port: process.env.PORT,
  db_url_identity: process.env.DB_URL_IDENTITY,
  db_url_hospital_a: process.env.DB_URL_HOSPITAL_A,
  db_url_hospital_b: process.env.DB_URL_HOSPITAL_B,
  jwt_secret: process.env.JWT_SECRET,
};
