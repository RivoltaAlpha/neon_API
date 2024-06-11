import { Hono } from "hono";
import { getService, createService, updateService, deleteService, listSC } from "./status-controller";
import { zValidator } from "@hono/zod-validator";
import { status_catalogSchema } from "../validator";
import { authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const statusRouter = new Hono();

// Apply authenticateBoth middleware to these routes
statusRouter.get('/status-catalog-all', authenticateBoth, listSC);
statusRouter.get("/status-catalog/:id", authenticateBoth, getService);

// Apply authenticateAdmin middleware to these routes
statusRouter.post(
  "/states",
  zValidator("json", status_catalogSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateAdmin,
  createService
);

// Update a state by ID
statusRouter.put("/states/:id", authenticateAdmin, updateService);

// Delete a state by ID
statusRouter.delete("/states/:id", authenticateAdmin, deleteService);
