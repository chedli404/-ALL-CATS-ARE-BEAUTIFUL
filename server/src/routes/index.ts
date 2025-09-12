import { Express } from "express";
import  authRoutes  from "./auth.routes";
import  characterRoutes  from "./characters.routes";
import tribeRoutes  from "./tribes.routes";
import { territoryRoutes } from "./territories.routes";
import { gameCardRoutes } from "./gameCards.routes";
import  pollRoutes  from "./polls.routes";
import contentRoutes from "./content.routes";
import {adminRoutes} from "./admin.routes";
import contactRoutes from "./Contact.routes.ts";



export function registerRoutes(app: Express): void {
  app.use("/api/auth", authRoutes);
  app.use("/api", characterRoutes);
  app.use("/api", tribeRoutes);
  app.use("/api", territoryRoutes);
  app.use("/api", gameCardRoutes);
  app.use("/api", pollRoutes);
  app.use("/api", contentRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api", contactRoutes);
}
