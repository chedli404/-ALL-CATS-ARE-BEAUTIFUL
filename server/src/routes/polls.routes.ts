import { Router } from "express";
import { storage } from "../../mongoStorage";

const router = Router();



// Get all polls with their options
router.get("/polls", async (req, res) => {
  try {
    const polls = await storage.getAllPolls();
    res.json(polls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).json({ message: "Failed to fetch polls" });
  }
});

// Get a specific poll with its options
router.get("/polls/:id", async (req, res) => {
  try {
    const polls = await storage.getAllPolls();
    const poll = polls.find((p: any) => p._id.toString() === req.params.id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    const options = await storage.getPollOptions(req.params.id);
    res.json({ ...poll, options });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch poll" });
  }
});

// Vote on a poll
router.post("/polls/:id/vote", async (req, res) => {
  try {
    const { optionId, username } = req.body;
    const pollId = req.params.id;
    // Optionally, add authentication here if needed
    const result = await storage.voteForPoll(username, pollId, optionId);
    if (result.status === 'locked') {
      return res.status(403).json({ message: "You have already changed your vote once for this poll." });
    }
    res.status(201).json(result);
  } catch (error: any) {
    console.error('Vote error:', error);
    res.status(500).json({ message: "Failed to submit vote", error: error.message });
  }
});

// Create a new vote option
router.post("/voteoptions", async (req, res) => {
  try {
    const { pollId, option } = req.body;
    const voteOption = await storage.createVoteOption({ pollId, option });
    res.status(201).json(voteOption);
  } catch (error) {
    res.status(500).json({ message: "Failed to create vote option", error: String(error) });
  }
});

// Get all options for a poll
router.get("/polls/:pollId/voteoptions", async (req, res) => {
  try {
    const options = await storage.getPollOptions(req.params.pollId);
    res.json(options);
  } catch (error) {
    res.status(500).json({ message: "Failed to get vote options", error: String(error) });
  }
});

// Get user poll status for a specific poll
router.get("/polls/:pollId/user-status", async (req, res) => {
  try {
    // Get username from JWT or query param
    let username = null;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const payload = require('jsonwebtoken').decode(token);
        username = payload?.username;
      } catch (err) {
        // Ignore decode errors, fallback to query param
      }
    }
    if (!username && req.query.username) {
      username = req.query.username;
    }
    if (!username) {
      // Return default status for missing username
      return res.status(200).json({ hasVoted: false, hasChanged: false, currentVote: null });
    }
    const pollId = req.params.pollId;
    const status = await storage.getUserPollStatus(username, pollId);
    if (!status) {
      // Always return JSON, even if no status
      return res.status(200).json({ hasVoted: false, hasChanged: false, currentVote: null });
    }
    res.json(status);
  } catch (error) {
    console.error('Error fetching user poll status:', error);
    res.status(500).json({ message: "Failed to fetch user poll status", error: String(error) });
  }
});



export default router;