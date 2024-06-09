import { Context } from "hono";
import {
  getStateService,
  createStateService,
  updateStateService,
  deleteStateService,
} from "./state.services";

// Get state by ID
export const getState = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await getStateService(id);
    if (!state) {
      return c.text("State not found", 404);
    }
    return c.json(state, 200);
  } catch (error: any) {
    console.error(error?.message);
    return c.json({ error: error?.message }, 500);
  }
};

// Create state
export const createState = async (c: Context) => {
  try {
    const stateData = await c.req.json();
    const createdStateMsg = await createStateService(stateData);

    if (!createdStateMsg) return c.text("State not created", 500);
    return c.json({ msg: createdStateMsg }, 201);
  } catch (error: any) {
    console.error(error?.message);
    return c.json({ error: error?.message }, 500);
  }
};

// Update state by ID
export const updateState = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const stateData = await c.req.json();
    const updatedStateMsg = await updateStateService(id, stateData);

    if (!updatedStateMsg) return c.text("State not updated", 404);
    return c.json({ msg: updatedStateMsg }, 200);
  } catch (error: any) {
    console.error(error?.message);
    return c.json({ error: error?.message }, 500);
  }
};

// Delete state by ID
export const deleteState = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const deletedStateMsg = await deleteStateService(id);

    if (!deletedStateMsg) return c.text("State not deleted", 404);
    return c.json({ msg: deletedStateMsg }, 200);
  } catch (error: any) {
    console.error(error?.message);
    return c.json({ error: error?.message }, 500);
  }
};
