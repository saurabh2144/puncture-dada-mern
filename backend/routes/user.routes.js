import express from "express";
import { protectuser } from "../middlewares/auth.middleware.js";
import { register, login, test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/Ulogin", (req, res) => {
  res.render("pages/userlogin", { message: null });
});


router.post("/Ulogin", login);

router.get("/Uregister", (req, res) => {
  res.render("pages/user-register");
});


router.post("/Uregister", register);


router.get("/test", protectuser, test);

export default router;
