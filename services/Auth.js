import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "../utils/env.js";
import DbService from "./Database.js";

const JWT_SECRET = env.jwt_secret;

class AuthService {
  extractDomain(email) {
    const parts = email.split("@");
    if (parts.length !== 2) throw new Error("Invalid email format");
    return parts[1];
  }

  async register(email, password) {
    const domain = this.extractDomain(email);

    const { rows } = await DbService.identityDb.query(
      "SELECT * FROM tenants WHERE domain = $1",
      [domain]
    );
    if (rows.length === 0) throw new Error("Invalid domain");

    const tenant = rows[0];
    const pool = await DbService.getTenantPool(tenant.id);

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashed]
    );

    return { message: "User registered" };
  }

  async login(email, password) {
    const domain = this.extractDomain(email);

    const { rows } = await DbService.identityDb.query(
      "SELECT * FROM tenants WHERE domain = $1",
      [domain]
    );
    if (rows.length === 0) throw new Error("Invalid domain");

    const tenant = rows[0];
    const pool = await DbService.getTenantPool(tenant.id);

    const { rows: users } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (users.length === 0) throw new Error("Invalid creds");

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid creds");

    const token = jwt.sign(
      { userId: user.id, tenantId: tenant.id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  }

  async authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Missing token" });

    try {
      const token = header.split(" ")[1];
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      req.db = await DbService.getTenantPool(payload.tenantId);
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
}

export default new AuthService();
