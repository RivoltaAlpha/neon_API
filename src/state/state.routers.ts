import { Hono } from "hono";
import { getState, createState, updateState, deleteState, listStates,listCitiesInStateController } from "./state.controller";
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validator";
import { authenticateBoth, authenticateAdmin } from "../middleware/auth";


export const stateRouter = new Hono();

// Specific routes where authenticateUser should be used instead of authenticateAdmin
stateRouter.get("/state/:id", authenticateBoth, getState);
stateRouter.get("/states", authenticateBoth, listStates);

// Create a state
stateRouter.post(
  "/create-state",
  zValidator("json", stateSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateAdmin, createState
);

// Update a state by ID
stateRouter.put("/state/:id",authenticateAdmin, updateState);

// Delete a state by ID
stateRouter.delete("/state/:id",authenticateAdmin, deleteState);

// list state 
stateRouter.get("/state/:id/list-state-cities",authenticateBoth, listCitiesInStateController);