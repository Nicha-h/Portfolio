import "dotenv/config";

export const env = {
  port: Number(process.env.BACKEND_PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? "",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
};
