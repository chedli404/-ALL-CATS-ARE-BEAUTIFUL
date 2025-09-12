import mongoose from 'mongoose';
import { z } from 'zod';

// Character Schema
const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tribe: { type: String, required: true },
  tribeColor: { type: String, required: true },
  description: { type: String, required: true },
  traits: [String],
  image: { type: String, required: true }
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String },
  level: { type: Number, default: 1 },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

// Tribe Schema
const tribeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  strengths: [String],
  icon: { type: String, required: true },
  image: { type: String }
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

// Vote Option Schema (matches your database structure)
const voteOptionSchema = new mongoose.Schema({
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true },
  option: { type: String, required: true },
  voteCount: { type: Number, default: 0 }
});

// Vote Schema - tracks individual votes
const voteSchema = new mongoose.Schema({
  username: { type: String, required: true },
  optionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// User Poll Status - tracks user voting status per poll
const userPollStatusSchema = new mongoose.Schema({
  username: { type: String, required: true },
  pollId: { type: String, required: true },
  hasVoted: { type: Boolean, default: false },
  hasChanged: { type: Boolean, default: false },
  currentVote: { type: String }, // optionId of current vote
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Tribe Image Schema
const tribeImageSchema = new mongoose.Schema({
  tribeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tribe', required: true },
  tribeName: { type: String, required: true },
  imageData: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// Zod Validation Schemas
export const insertCharacterSchema = z.object({
  name: z.string(),
  tribe: z.string(),
  tribeColor: z.string(),
  description: z.string(),
  traits: z.array(z.string()),
  image: z.string()
});

export const insertUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  displayName: z.string().optional(),
  level: z.number().default(1)
});

export const insertTribeSchema = z.object({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  strengths: z.array(z.string()),
  icon: z.string(),
  image: z.string().optional()
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
  username: z.string(),
  optionId: z.string()
});

export const insertUserPollStatusSchema = z.object({
  username: z.string(),
  pollId: z.string(),
  hasVoted: z.boolean().default(false),
  hasChanged: z.boolean().default(false),
  currentVote: z.string().optional()
});

export const insertTribeImageSchema = z.object({
  tribeId: z.string(),
  tribeName: z.string(),
  imageData: z.string()
});

// Frontend validation schemas
export const loginSchema = z.object({
  identifier: z.string().min(1, { message: "Username or email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Export Mongoose Models
export const User = mongoose.model('User', userSchema);
export const Character2 = mongoose.model('Character2', characterSchema, 'characters2');
export const Tribe = mongoose.model('Tribe', tribeSchema);
export const Territory = mongoose.model('Territory', territorySchema);
export const GameCard = mongoose.model('GameCard', gameCardSchema);
export const Poll = mongoose.model('Poll', pollSchema);
export const VoteOption = mongoose.model('VoteOption', voteOptionSchema);
export const Vote = mongoose.model('Vote', voteSchema);
export const UserPollStatus = mongoose.model('UserPollStatus', userPollStatusSchema);
export const TribeImage = mongoose.model('TribeImage', tribeImageSchema);

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

export type InsertUserPollStatus = z.infer<typeof insertUserPollStatusSchema>;
export type UserPollStatusType = mongoose.Document & InsertUserPollStatus;

export type InsertTribeImage = z.infer<typeof insertTribeImageSchema>;
export type TribeImageType = mongoose.Document & InsertTribeImage;