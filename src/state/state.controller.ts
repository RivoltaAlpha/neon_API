import { Context } from "hono";
import {
  listStatesService,
  getStateService,
  createStateService,
  updateStateService,
  deleteStateService,
  listCitiesInState
  
} from "./state.services";

export const listCitiesInStateController = async (c: Context) => {
  try {
    const stateId = parseInt(c.req.param("id")); 
    console.log("State ID Parameter😒:", stateId);

    if (isNaN(stateId) || stateId <= 0) {
        console.log("Invalid State ID:", stateId);
        return c.text("Invalid state ID", 400);
    }

    const cities = await listCitiesInState(stateId);
    return c.json(cities, 200);
} catch (error: any) {
    console.error(error?.message);
    return c.json({ error: error?.message }, 500);
}
};

export const listStates = async (c: Context) => {
  try {
      //limit the number of users to be returned

      const limit = Number(c.req.query('limit'))

      const data = await listStatesService(limit);
      if (data == null || data.length == 0) {
          return c.text("User not found", 404)
      }
      return c.json(data, 200);
  } catch (error: any) {
      return c.json({ error: error?.message }, 400)
  }
}

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
