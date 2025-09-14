import { Request } from "express";
import type { DataSource } from "typeorm";

interface AuthRequest extends Request {
  user?: { userId: string; tenantId: string };
  db?: DataSource;
}