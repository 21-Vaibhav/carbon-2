import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { studentRoutes } from "./routes/student";
import { professorRoutes } from "./routes/professor";

const app = new Hono();
const prisma = new PrismaClient();

app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: err.message }, 500);
});

app.route("/", studentRoutes);
app.route("/", professorRoutes);

app.get("/", (c) => {
  return c.json({ message: "College API is running" });
});

export { app, prisma };

// Start the server
if (import.meta.main) {
  serve({
    fetch: app.fetch,
    port: 3000,
  });
  console.log("Server is running on port 3000");
}
