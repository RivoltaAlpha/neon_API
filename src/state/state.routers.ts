import { Hono } from "hono";
import { getState, createState, updateState, deleteState, listStates } from "./state.controller";
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validator";
import { authenticateUser, authenticateAdmin } from "../middleware/auth";


export const stateRouter = new Hono();

// Apply authenticateUser middleware to all routes
stateRouter.use('*', authenticateAdmin);


// Get a single state by ID: api/states/1
stateRouter.get("/states/:id", authenticateUser, getState);

stateRouter.get("/states", authenticateUser, listStates);  

// Create a state
stateRouter.post(
  "/states",
  zValidator("json", stateSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  createState
);

// Update a state by ID
stateRouter.put("/states/:id", updateState);

// Delete a state by ID
stateRouter.delete("/states/:id", deleteState);
