// routes/auth.routes.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import upload from "../middlewares/multer.js"; 
import {
  getMechanics,
  register,
  login,
  logout,
  getLogin,
  getRegister
} from "../controllers/auth.controller.js";

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/login", getLogin);
router.get("/register", getRegister);

router.post("/register", upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "aadharPic", maxCount: 1 }
]), register);

router.post("/login", login);
router.get("/logout", logout);

router.get("/", (req, res) => {
  res.render("pages/home");
});

router.get("/getmechanic", getMechanics);
router.get("/getAllMec", (req, res) => res.render("pages/allmec"));

export default router;
