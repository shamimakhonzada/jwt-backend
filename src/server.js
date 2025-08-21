// src/server.js
import http from "http";
import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";

const server = http.createServer(app);

async function start() {
  try {
    // Test DB connection
    await prisma.$queryRaw`SELECT 1`;

    server.listen(env.port, () => {
      console.log(` Server running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error(" Failed to start server:", err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log(" SIGINT received. Closing server...");
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

process.on("SIGTERM", async () => {
  console.log(" SIGTERM received. Closing server...");
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

start();
