import jwt from "jsonwebtoken";
import Mechanic from "../models/mechanic.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const USER_SECRET = "Secret";

const JWT_SECRET = "Saurabh";



export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.id) return res.redirect("/login");

    const mechanic = await Mechanic.findById(decoded.id).select("-password");
    if (!mechanic) return res.redirect("/login");

    req.mechanic = mechanic;
    console.log("Mechanic logged in:", mechanic);
console.log("Profile Pic URL:", mechanic.profilePic);

    console.log(" Mechanic fetched:", mechanic);
    next();
  } catch (err) {
    console.log(" Mechanic token verification failed:", err.message);
    return res.redirect("/login");
  }
};


export const protectuser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/Ulogin");

  try {
    const decoded = jwt.verify(token, USER_SECRET);
    if (!decoded.id) {
      console.log(" ID missing in token payload.");
      return res.redirect("/Ulogin");
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log(" User not found in DB");
      return res.redirect("/Ulogin");
    }

    req.user = user;
    console.log(" User fetched:", user);
    next();
  } catch (err) {
    console.log(" User token verification failed:", err.message);
    return res.redirect("/Ulogin");
  }
};
