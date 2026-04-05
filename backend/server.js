import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import repoRoutes from "./routes/repoRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", repoRoutes);
app.use("/api/contact", contactRoutes);

// Serve Frontend Statically
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
