import { Hono } from "hono";
import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import { pool } from "./db";

dotenv.config();
const app = new Hono();
const port = Number(process.env.PORT || 3000);

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));

// Simple DB check
app.get("/db-check", async (c) => {
  try {
    const res = await pool.query("SELECT 1");
    return c.json({ db: "ok", result: res.rows });
  } catch (err) {
    return c.json({ db: "error", error: err }, 500);
  }
});

serve({ fetch: app.fetch, port });
