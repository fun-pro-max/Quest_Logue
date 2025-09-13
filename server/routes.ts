import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTaskSchema, insertAchievementSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tasks
  app.get("/api/tasks", async (req, res) => {
    try {
      const tasks = await storage.getTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  // Create a new task
  app.post("/api/tasks", async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid task data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create task" });
      }
    }
  });

  // Complete a task (delete it and potentially create achievement)
  app.post("/api/tasks/:id/complete", async (req, res) => {
    try {
      const task = await storage.getTask(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      // If it's a boss fight, create an achievement
      if (task.category === 'boss') {
        const achievementData = {
          title: `${task.title} Victor`,
          description: `Conquered: ${task.description}`,
          icon: getIconForBossFight(task.title),
          xpEarned: task.xpReward
        };
        await storage.createAchievement(achievementData);
      }

      // Delete the task
      await storage.deleteTask(req.params.id);
      res.json({ message: "Task completed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to complete task" });
    }
  });

  // Delete a task
  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTask(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
  });

  // Get all achievements
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  // Delete an achievement
  app.delete("/api/achievements/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteAchievement(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Achievement not found" });
      }
      res.json({ message: "Achievement deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete achievement" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getIconForBossFight(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('dragon')) return '🐉';
  if (lowerTitle.includes('titan') || lowerTitle.includes('frost')) return '🏔️';
  if (lowerTitle.includes('lich') || lowerTitle.includes('arcane')) return '🔮';
  if (lowerTitle.includes('demon') || lowerTitle.includes('fiend')) return '👹';
  if (lowerTitle.includes('beast') || lowerTitle.includes('wolf')) return '🐺';
  if (lowerTitle.includes('skeleton') || lowerTitle.includes('bone')) return '💀';
  return '⚔️';
}
