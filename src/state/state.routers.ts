import { Hono } from "hono";
import { getState, createState, updateState, deleteState } from "./state.controller";
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validator";

export const stateRouter = new Hono();

// Get a single state by ID: api/states/1
stateRouter.get("/states/:id", getState);

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
