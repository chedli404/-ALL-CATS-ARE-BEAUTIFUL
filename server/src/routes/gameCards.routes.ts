import { Router } from "express";
import { storage } from "../../mongoStorage";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cards = await storage.getAllGameCards();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch game cards" });
  }
});

export { router as gameCardRoutes };