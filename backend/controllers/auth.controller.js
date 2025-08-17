import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Mechanic from "../models/mechanic.model.js";

const JWT_SECRET = "Saurabh";

export const getLogin = (req, res) => res.render("pages/login");

export const getRegister = (req, res) => res.render("pages/register");

export const register = async (req, res) => {
  const { name, phone, password, latitude, longitude } = req.body;
  const profilePic = req.files["profilePic"]?.[0]?.filename || "";
  const aadharPic = req.files["aadharPic"]?.[0]?.filename || "";

  if (!name || !phone || !password || !profilePic || !aadharPic || !latitude || !longitude) {
    return res.send("Missing fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Mechanic.create({
    name,
    phone,
    password: hashedPassword,
    profilePic,
    aadharPic,
    latitude,
    longitude,
  });

  res.redirect("/login");
};

export const login = async (req, res) => {
  const { phone, password } = req.body;
  const mechanic = await Mechanic.findOne({ phone });
  if (!mechanic) return res.send("Invalid phone or password");

  const isMatch = await bcrypt.compare(password, mechanic.password);
  if (!isMatch) return res.send("Invalid phone or password");

  const token = jwt.sign({ id: mechanic._id }, JWT_SECRET);
     console.log(`the token send from backend is ${token}`);
  res.cookie("token", token);
  res.redirect("/me");
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

export const getMechanics = async (req, res) => {
  try {
    const mechanics = await Mechanic.find({}, "-password -__v");
    res.json({ success: true, data: mechanics });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching mechanics" });
  }
};
