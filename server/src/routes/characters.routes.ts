import { Router } from "express";
import { storage } from "../../mongoStorage";

const router = Router();

router.get("/characters", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const characters = await storage.getAllCharacters();
    const limitedCharacters = characters.slice(0, limit);
    res.json(limitedCharacters);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch characters" });
  }
});

router.get("/characters/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const character = await storage.getCharacter(id);
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch character" });
  }
});

export default router;
