import express from "express";
import Mechanic from "../models/mechanic.model.js";

const router = express.Router();

router.get("/admin", (req, res) => {
  res.render("pages/admin", { mechanics: null, mechanic: null });
});

router.get("/admin/show-all-mechanics", async (req, res) => {
  try {
    const mechanics = await Mechanic.find().lean();
    res.render("pages/admin", { mechanics, mechanic: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching mechanics");
  }
});

router.post("/admin/search-mechanic", async (req, res) => {
  try {
    const mechanic = await Mechanic.findOne({
      name: new RegExp(req.body.name, "i"),
    }).lean();

    res.render("pages/admin", { mechanics: null, mechanic });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error searching mechanic");
  }
});

router.post("/admin/delete-mechanic/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Mechanic.findByIdAndDelete(id);
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.log(err);
    res.send("Error deleting mechanic.");
  }
});


export default router;
