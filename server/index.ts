import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";
const rootPublicPath = path.join(__dirname, "..", "public");

if (isProd) {
  const staticPath = path.join(__dirname, "public");
  app.use(express.static(staticPath));
  app.use(express.static(rootPublicPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
} else {
  app.use(express.static(rootPublicPath));
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa",
    root: path.join(__dirname, "..", "client"),
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
