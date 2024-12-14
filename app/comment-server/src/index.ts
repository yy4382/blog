import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { api } from "./api/index.js";

const app = new Hono();

app.route("/api", api);

if (!process.env.STATIC_FILE_LOCATION) {
  throw new Error("STATIC_FILE_LOCATION environment variable is required");
}

function checkIfStaticUrl(location: string): boolean {
  try {
    new URL(location);
    return true;
  } catch {
    return false;
  }
}

const isStaticUrl = checkIfStaticUrl(process.env.STATIC_FILE_LOCATION);
console.log(`isStaticUrl: ${isStaticUrl}`);

app.use(
  "*",
  isStaticUrl
    ? (c) => {
        const url = new URL(
          new URL(c.req.url).pathname,
          process.env.STATIC_FILE_LOCATION,
        );

        return fetch(url);
      }
    : serveStatic({ root: process.env.STATIC_FILE_LOCATION }),
);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
