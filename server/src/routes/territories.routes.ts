import { Router } from "express";
import { storage } from "../../mongoStorage";

const router = Router();

router.get("/territories", async (req, res) => {
  try {
    const territories = await storage.getAllTerritories();
    res.json(territories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch territories" });
  }
});

export default router;
