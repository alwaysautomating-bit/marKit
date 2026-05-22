import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { 
  generateMarketStrategy, 
  generateCoreMessaging, 
  generateTacticalAssets, 
  generatePodcastOutreach 
} from "./src/services/geminiService";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser limit increased for larger notes and assets
  app.use(express.json({ limit: "15mb" }));

  // API Route 1: Market Strategy
  app.post("/api/market-strategy", async (req, res) => {
    try {
      const { notes, marketType } = req.body;
      if (!notes || !Array.isArray(notes)) {
        return res.status(400).json({ error: "No notes provided." });
      }
      const result = await generateMarketStrategy(notes, marketType);
      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/market-strategy:", error);
      res.status(500).json({ error: error.message || "Failed to generate market strategy" });
    }
  });

  // API Route 2: Core Messaging
  app.post("/api/core-messaging", async (req, res) => {
    try {
      const { notes, target } = req.body;
      if (!notes || !Array.isArray(notes)) {
        return res.status(400).json({ error: "No notes provided." });
      }
      const result = await generateCoreMessaging(notes, target || "all");
      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/core-messaging:", error);
      res.status(500).json({ error: error.message || "Failed to generate core messaging" });
    }
  });

  // API Route 3: Tactical Assets
  app.post("/api/tactical-assets", async (req, res) => {
    try {
      const { notes, target } = req.body;
      if (!notes || !Array.isArray(notes)) {
        return res.status(400).json({ error: "No notes provided." });
      }
      const result = await generateTacticalAssets(notes, target || "all");
      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/tactical-assets:", error);
      res.status(500).json({ error: error.message || "Failed to generate tactical assets" });
    }
  });

  // API Route 4: Podcast Outreach
  app.post("/api/podcast-outreach", async (req, res) => {
    try {
      const { notes, customProductDesc, customAudience, customValueAngle } = req.body;
      if (!notes || !Array.isArray(notes)) {
        return res.status(400).json({ error: "No notes provided." });
      }
      const result = await generatePodcastOutreach(
        notes,
        customProductDesc,
        customAudience,
        customValueAngle
      );
      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/podcast-outreach:", error);
      res.status(500).json({ error: error.message || "Failed to generate podcast outreach" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
