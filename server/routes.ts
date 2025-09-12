import express, { type Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";

// Import route handlers
import authRoutes from "./src/routes/auth.routes";
import characterRoutes from "./src/routes/characters.routes";
import  tribeRoutes  from "./src/routes/tribes.routes";
import {territoryRoutes} from "./src/routes/territories.routes";
import {gameCardRoutes} from "./src/routes/gameCards.routes";
import {adminRoutes} from "./src/routes/admin.routes";
import contentRoutes from "./src/routes/content.routes";
import pollRoutes from "./src/routes/polls.routes";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Configure session
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'acab-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: process.env.NODE_ENV === 'production',
      },
    })
  );

  // Register all routes
  app.use('/api/auth', authRoutes);
  app.use('/api', characterRoutes);
  app.use('/api', tribeRoutes);
  app.use('/api', territoryRoutes);
  app.use('/api', gameCardRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api', contentRoutes);
  app.use('/api', pollRoutes);

  return httpServer;
}