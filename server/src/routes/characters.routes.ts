import { Router } from "express";
import { storage } from "../../mongoStorage";

const router = Router();

router.get("/characters", async (req, res) => {
  try {
    const characters = await storage.getAllCharacters2();
    res.json(characters);
  } catch (error: any) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ message: "Failed to fetch characters", error: error?.message });
  }
});

router.get("/characters/:id", async (req, res) => {
  try {
    const character = await storage.getcharacters2(req.params.id);
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch character" });
  }
});

export default router;