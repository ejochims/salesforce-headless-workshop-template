import crypto from "crypto";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";
const rootPublicPath = path.join(__dirname, "..", "public");

const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const SITE_USER = process.env.SITE_USER || "workshop";
const SITE_PASSWORD = process.env.SITE_PASSWORD || "";

function makeToken(user: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(user).digest("hex");
}

function loginPage(error = ""): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Headless 360 Workshop</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 58%, #EEF5FF 100%);
      padding: 24px;
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      background: #FFFFFF;
      border: 1px solid #D9E2EF;
      border-radius: 10px;
      box-shadow: 0 18px 45px rgba(16, 24, 40, 0.08);
      padding: 40px 36px;
    }
    .brand-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-bottom: 32px;
    }
    .brand-mark {
      display: grid;
      gap: 2px;
      text-align: left;
      min-width: 118px;
    }
    .brand-mark strong {
      color: #182230;
      font-size: 15px;
      font-weight: 900;
      line-height: 1.05;
    }
    .brand-mark span {
      color: #667085;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
    }
    .brand-mark.salesforce strong { color: #0176D3; }
    .brand-plus {
      font-size: 18px;
      font-weight: 300;
      color: #B9C7D9;
    }
    .login-title {
      text-align: center;
      font-size: 26px;
      font-weight: 900;
      color: #182230;
      line-height: 1.1;
      margin-bottom: 8px;
    }
    .login-subtitle {
      text-align: center;
      font-size: 14px;
      color: #667085;
      margin-bottom: 28px;
      line-height: 1.5;
    }
    .field { margin-bottom: 16px; }
    .field label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      color: #344054;
      margin-bottom: 6px;
    }
    .field input {
      width: 100%;
      padding: 12px 14px;
      font-size: 14px;
      font-family: 'Inter', sans-serif;
      border: 1px solid #D9E2EF;
      border-radius: 6px;
      background: #F7F9FC;
      color: #182230;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .field input:focus {
      border-color: #0053E2;
      box-shadow: 0 0 0 3px rgba(0, 83, 226, 0.1);
      background: #FFFFFF;
    }
    .submit-btn {
      width: 100%;
      padding: 13px 20px;
      background: #0053E2;
      border: none;
      border-radius: 6px;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 900;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      box-shadow: 0 14px 30px rgba(0, 83, 226, 0.22);
      transition: background 0.15s;
      margin-top: 8px;
    }
    .submit-btn:hover { background: #003DB0; }
    .error-msg {
      text-align: center;
      font-size: 13px;
      font-weight: 700;
      color: #B42318;
      background: #FEF3F2;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 16px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin: 0 auto 20px;
      padding: 6px 10px;
      border-radius: 999px;
      background: #EEF5FF;
      border: 1px solid #B2DDFF;
      color: #0053E2;
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      text-align: center;
    }
    .badge-wrap { text-align: center; }
  </style>
</head>
<body>
  <div class="login-card">
    <div class="brand-row">
      <div class="brand-mark"><strong>Agentic Workshop</strong><span>Coding harness</span></div>
      <span class="brand-plus">+</span>
      <div class="brand-mark salesforce"><strong>Salesforce</strong><span>Enterprise platform</span></div>
    </div>
    <div class="badge-wrap"><span class="badge">Authenticated access</span></div>
    <h1 class="login-title">Headless 360 Workshop</h1>
    <p class="login-subtitle">Enter your credentials to access the presenter console.</p>
    ${error ? `<div class="error-msg">${error}</div>` : ""}
    <form method="POST" action="/login">
      <div class="field">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" autocomplete="username" required autofocus>
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" autocomplete="current-password" required>
      </div>
      <button type="submit" class="submit-btn">Enter workshop</button>
    </form>
  </div>
</body>
</html>`;
}

if (isProd && SITE_PASSWORD) {
  app.use(express.urlencoded({ extended: false }));

  app.use("/assets", express.static(path.join(rootPublicPath, "assets")));

  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === SITE_USER && password === SITE_PASSWORD) {
      const token = makeToken(username);
      res.cookie("session", token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 86400000 });
      res.redirect("/");
    } else {
      res.status(401).send(loginPage("Invalid username or password."));
    }
  });

  app.use((req, res, next) => {
    if (req.path === "/login") return next();
    const token = req.headers.cookie
      ?.split(";")
      .map((c) => c.trim().split("="))
      .find(([k]) => k === "session")?.[1];
    if (token === makeToken(SITE_USER)) return next();
    res.send(loginPage());
  });
}

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
