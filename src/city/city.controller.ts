import { Context } from "hono";
import {
  getCityService,
  createCityService,
  updateCityService,
  deleteCityService,
} from "./city.services";

// Get city by ID
export const getCity = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const city = await getCityService(id);
    if (city === null) {
      return c.text("City not found", 404);
    }
    return c.json(city, 200);
  } catch (error: any) {
    console.error(error?.message);
    return c.json({ error: error?.message }, 500);
  }
};

// Create a city
export const createCity = async (c: Context) => {
  try {
    const city = await c.req.json();
    const createdCity = await createCityService(city);

    if (!createdCity) return c.text("City not created", 404);
    return c.json({ msg: createdCity }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Update a city by ID
export const updateCity = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const city = await c.req.json();
  try {
    const searchedCity = await getCityService(id);
    if (searchedCity == undefined) return c.text("City not found", 404);

    const res = await updateCityService(id, city);
    if (!res) return c.text("City not updated", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Delete a city by ID
export const deleteCity = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  try {
    const city = await getCityService(id);
    if (city == undefined) return c.text("City not found", 404);

    const res = await deleteCityService(id);
    if (!res) return c.text("City not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
