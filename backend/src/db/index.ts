import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { env } from "../config/env.js";
import * as schema from "../models/index.js";

let db: NeonHttpDatabase<typeof schema> | undefined;

// Created lazily so the server can boot before DATABASE_URL is configured.
export function getDb() {
  if (!db) {
    if (!env.databaseUrl) {
      throw new Error("DATABASE_URL is not set. Copy backend/.env.example to backend/.env.");
    }
    db = drizzle({ client: neon(env.databaseUrl), schema });
  }
  return db;
}
