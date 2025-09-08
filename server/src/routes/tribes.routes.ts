import { Router } from "express";
import { storage } from "../../mongoStorage";

const router = Router();

router.get("/tribes", async (req, res) => {
  try {
    const tribes = await storage.getAllTribes();
    res.json(tribes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tribes" });
  }
});

router.get("/tribes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tribe = await storage.getTribe(id);
    if (!tribe) {
      return res.status(404).json({ message: "Tribe not found" });
    }
    res.json(tribe);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tribe" });
  }
});

export default router;
