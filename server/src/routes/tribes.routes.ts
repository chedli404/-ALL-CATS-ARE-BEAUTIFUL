import { Router } from "express";
import { storage } from "../../mongoStorage";

const router = Router();

router.get("/tribes", async (req, res) => {
  try {
    const tribes = await storage.getAllTribes();
    res.json(tribes);
  } catch (error: any) {
    console.error("Error fetching tribes:", error);
    res.status(500).json({ message: "Failed to fetch tribes", error: error?.message });
  }
});

router.get("/tribes/:id", async (req, res) => {
  try {
    const tribe = await storage.getTribe(req.params.id);
    if (!tribe) {
      return res.status(404).json({ message: "Tribe not found" });
    }
    res.json(tribe);
  } catch (error: any) {
    console.error("Error fetching tribe:", error);
    res.status(500).json({ message: "Failed to fetch tribe", error: error?.message });
  }
});

export default router;