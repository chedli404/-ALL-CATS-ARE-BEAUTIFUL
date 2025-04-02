import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull().default("NOW()"),
});

// Characters table
export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tribe: text("tribe").notNull(),
  description: text("description").notNull(),
  traits: text("traits").array(),
  imageUrl: text("image_url"),
  tribeIcon: text("tribe_icon"),
  tribeColor: text("tribe_color"),
});

// Tribes table
export const tribes = pgTable("tribes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  color: text("color").notNull(),
  icon: text("icon"),
  strengths: text("strengths").array(),
});

// Territories table
export const territories = pgTable("territories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  tribeId: integer("tribe_id").references(() => tribes.id),
  svgPath: text("svg_path").notNull(),
  color: text("color").notNull(),
});

// Game cards table
export const gameCards = pgTable("game_cards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  tribe: text("tribe"),
  strength: integer("strength"),
  description: text("description").notNull(),
  imageIcon: text("image_icon"),
});

// Votes table
export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  optionId: integer("option_id").references(() => voteOptions.id).notNull(),
  createdAt: text("created_at").notNull().default("NOW()"),
});

// Vote options table
export const voteOptions = pgTable("vote_options", {
  id: serial("id").primaryKey(),
  pollId: integer("poll_id").references(() => polls.id).notNull(),
  option: text("option").notNull(),
});

// Polls table
export const polls = pgTable("polls", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  active: boolean("active").notNull().default(true),
  expiresAt: text("expires_at"),
});

// Schema validations
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertCharacterSchema = createInsertSchema(characters);
export const insertTribeSchema = createInsertSchema(tribes);
export const insertTerritorySchema = createInsertSchema(territories);
export const insertGameCardSchema = createInsertSchema(gameCards);
export const insertVoteSchema = createInsertSchema(votes).pick({
  userId: true,
  optionId: true,
});
export const insertVoteOptionSchema = createInsertSchema(voteOptions);
export const insertPollSchema = createInsertSchema(polls).pick({
  title: true,
  description: true,
  active: true,
  expiresAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type Character = typeof characters.$inferSelect;

export type InsertTribe = z.infer<typeof insertTribeSchema>;
export type Tribe = typeof tribes.$inferSelect;

export type InsertTerritory = z.infer<typeof insertTerritorySchema>;
export type Territory = typeof territories.$inferSelect;

export type InsertGameCard = z.infer<typeof insertGameCardSchema>;
export type GameCard = typeof gameCards.$inferSelect;

export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votes.$inferSelect;

export type InsertVoteOption = z.infer<typeof insertVoteOptionSchema>;
export type VoteOption = typeof voteOptions.$inferSelect;

export type InsertPoll = z.infer<typeof insertPollSchema>;
export type Poll = typeof polls.$inferSelect;
