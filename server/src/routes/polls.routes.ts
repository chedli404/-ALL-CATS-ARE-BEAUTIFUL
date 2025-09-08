import { Router } from "express";
import { storage } from "../../mongoStorage";
import { insertVoteSchema } from "../../../shared/mongoSchema";
import { z } from "zod";

const router = Router();

router.get("/polls", async (req, res) => {
  try {
    const polls = await storage.getAllPolls();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch polls" });
  }
});

router.get("/polls/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const poll = await storage.getPoll(id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    const options = await storage.getPollOptions(id);
    res.json({
      ...poll,
      options
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch poll" });
  }
});

router.post("/votes", async (req, res) => {
  try {
    const voteData = insertVoteSchema.parse(req.body);
    const vote = await storage.createVote(voteData);
    res.status(201).json(vote);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid vote data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create vote" });
  }
});

export default router;
