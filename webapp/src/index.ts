import { serve } from "@hono/node-server";
import { DbConnect } from "@/db";
import { initializeRedisClient } from "@/lib/redis-client";
import env from "../env";
import app from "./app";

await DbConnect();
await initializeRedisClient();
serve({
  fetch: app.fetch,
  port: env.PORT,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
