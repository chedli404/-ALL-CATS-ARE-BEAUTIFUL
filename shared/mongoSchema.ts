import mongoose from 'mongoose';
import { z } from 'zod';

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Character Schema
const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tribe: { type: String, required: true },
  tribeColor: { type: String, required: true },
  description: { type: String, required: true },
  traits: [String],
  image: { type: String, required: true }
});

// Tribe Schema
const tribeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  strengths: [String],
  icon: { type: String, required: true }
});

// Territory Schema
const territorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tribe: { type: String, required: true },
  path: { type: String, required: true },
  color: { type: String, required: true }
});

// Game Card Schema
const gameCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  tribe: { type: String },
  strength: { type: Number, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  icon: { type: String, required: true }
});

// Poll Schema
const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

// Vote Option Schema
const voteOptionSchema = new mongoose.Schema({
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true },
  option: { type: String, required: true },
  voteCount: { type: Number, default: 0 }
});

// Vote Schema
const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  optionId: { type: mongoose.Schema.Types.ObjectId, ref: 'VoteOption', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Zod Validation Schemas
export const insertUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  displayName: z.string().optional()
});

export const insertCharacterSchema = z.object({
  name: z.string(),
  tribe: z.string(),
  tribeColor: z.string(),
  description: z.string(),
  traits: z.array(z.string()),
  image: z.string()
});

export const insertTribeSchema = z.object({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  strengths: z.array(z.string()),
  icon: z.string()
});

export const insertTerritorySchema = z.object({
  name: z.string(),
  description: z.string(),
  tribe: z.string(),
  path: z.string(),
  color: z.string()
});

export const insertGameCardSchema = z.object({
  name: z.string(),
  type: z.string(),
  tribe: z.string().optional(),
  strength: z.number(),
  description: z.string(),
  color: z.string(),
  icon: z.string()
});

export const insertPollSchema = z.object({
  title: z.string(),
  description: z.string(),
  active: z.boolean().default(true),
  expiresAt: z.date().optional()
});

export const insertVoteOptionSchema = z.object({
  pollId: z.string(),
  option: z.string()
});

export const insertVoteSchema = z.object({
  userId: z.string(),
  optionId: z.string()
});

// Export Mongoose Models
export const User = mongoose.model('User', userSchema);
export const Character = mongoose.model('Character', characterSchema);
export const Tribe = mongoose.model('Tribe', tribeSchema);
export const Territory = mongoose.model('Territory', territorySchema);
export const GameCard = mongoose.model('GameCard', gameCardSchema);
export const Poll = mongoose.model('Poll', pollSchema);
export const VoteOption = mongoose.model('VoteOption', voteOptionSchema);
export const Vote = mongoose.model('Vote', voteSchema);

// Export Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserType = mongoose.Document & InsertUser;

export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type CharacterType = mongoose.Document & InsertCharacter;

export type InsertTribe = z.infer<typeof insertTribeSchema>;
export type TribeType = mongoose.Document & InsertTribe;

export type InsertTerritory = z.infer<typeof insertTerritorySchema>;
export type TerritoryType = mongoose.Document & InsertTerritory;

export type InsertGameCard = z.infer<typeof insertGameCardSchema>;
export type GameCardType = mongoose.Document & InsertGameCard;

export type InsertPoll = z.infer<typeof insertPollSchema>;
export type PollType = mongoose.Document & InsertPoll;

export type InsertVoteOption = z.infer<typeof insertVoteOptionSchema>;
export type VoteOptionType = mongoose.Document & InsertVoteOption;

export type InsertVote = z.infer<typeof insertVoteSchema>;
export type VoteType = mongoose.Document & InsertVote;