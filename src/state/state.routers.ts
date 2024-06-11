import { Hono } from "hono";
import { getState, createState, updateState, deleteState, listStates } from "./state.controller";
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validator";
import { authenticateBoth, authenticateAdmin } from "../middleware/auth";


export const stateRouter = new Hono();

// Specific routes where authenticateUser should be used instead of authenticateAdmin
stateRouter.get("/states/:id", authenticateBoth, getState);
stateRouter.get("/states", authenticateBoth, listStates);

// Create a state
stateRouter.post(
  "/states",
  zValidator("json", stateSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateAdmin, createState
);

// Update a state by ID
stateRouter.put("/states/:id",authenticateAdmin, updateState);

// Delete a state by ID
stateRouter.delete("/states/:id",authenticateAdmin, deleteState);
