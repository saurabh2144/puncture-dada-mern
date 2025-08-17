import express from "express";
import http from "http";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { initSocket , recivedMechData } from "./config/webs.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { protect, protectuser } from "./middlewares/auth.middleware.js";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import dotenv from "dotenv";
import { userInfo } from "os";
dotenv.config();
import adminRoutes from "./routes/admin.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

initSocket(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(join(__dirname, "uploads")));
app.use(express.static(join(__dirname, "public")));
app.use(express.static(resolve("public")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use("/", authRoutes);
app.use(userRoutes);
app.use(adminRoutes); 

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/user', (req, res) => {
  res.render('pages/user-chat'); 
});

app.get('/mechanic', (req, res) => {
  res.render('pages/mechanic-chat'); 
});

app.get("/me", protect, (req, res) => {
  res.render("pages/mechanic", { mechanic: req.mechanic });
});

app.get("/booked", (req, res) => {
  if (!recivedMechData) {
    return res.send("Mechanic data not available.");
  }
  res.render("pages/booked", recivedMechData);
});

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB Error:", err));
