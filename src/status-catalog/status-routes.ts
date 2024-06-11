import { Hono } from "hono";
import { getService, createService, updateService, deleteService } from "./status-controller";
import { zValidator } from "@hono/zod-validator";
import { status_catalogSchema } from "../validator";
import { authenticateUser, authenticateAdmin } from "../middleware/auth";

export const statusRouter = new Hono();

// Apply authenticateUser middleware to all routes
statusRouter.use('*', authenticateAdmin);

// Get a single state by ID: api/states/1
statusRouter.get("/states/:id",  authenticateUser,getService);

// Create a state
statusRouter.post(
  "/states",
  zValidator("json", status_catalogSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  createService
);

// Update a state by ID
statusRouter.put("/states/:id", updateService);

// Delete a state by ID
statusRouter.delete("/states/:id", deleteService);
