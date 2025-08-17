import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = "Saurabh";
const USER_SECRET = "Secret";


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.render("pages/userregister", { message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.render("pages/userregister", { message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.redirect("/Ulogin");
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("pages/userlogin", { message: "Email & password required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("pages/userlogin", { message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render("pages/userlogin", { message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id }, USER_SECRET,{ expiresIn: "1h" });
  res.cookie("token", token);
  res.render("pages/allmec");
};


export const test = (req, res) => {
  res.render("pages/test");
};
