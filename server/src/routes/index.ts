
import { Express } from "express";
import authRoutes from "./auth.routes";
import charactersRoutes from "./characters.routes";
import tribesRoutes from "./tribes.routes";
import territoriesRoutes from "./territories.routes";
import gameCardsRoutes from "./gameCards.routes";
import pollsRoutes from "./polls.routes";

export function registerRoutes(app: Express) {
  app.use("/api/auth", authRoutes);
  app.use("/api", charactersRoutes);
  app.use("/api", tribesRoutes);
  app.use("/api", territoriesRoutes);
  app.use("/api", gameCardsRoutes);
  app.use("/api", pollsRoutes);
}
