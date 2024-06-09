import { Hono } from "hono";
import { getCity, createCity, updateCity, deleteCity } from "./city.controller";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validator";

export const cityRouter = new Hono();

// Get a single city by ID: api/cities/1
cityRouter.get("/cities/:id", getCity);

// Create a city
cityRouter.post(
  "/cities",
  zValidator("json", citySchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  createCity
);

// Update a city by ID
cityRouter.put("/cities/:id", updateCity);

// Delete a city by ID
cityRouter.delete("/cities/:id", deleteCity);
