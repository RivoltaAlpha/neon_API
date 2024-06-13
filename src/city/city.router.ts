import { Hono } from "hono";
import { getCity, createCity, updateCity, deleteCity, listCity } from "./city.controller";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validator";
import { authenticateBoth, authenticateAdmin } from "../middleware/auth";

export const cityRouter = new Hono();

// Get a single city by ID: api/cities/1
cityRouter.get("/cities/:id", authenticateBoth, getCity);

cityRouter.get("/list-cities", authenticateBoth, listCity);

// Create a city
cityRouter.post(
  "/create-cities",
  zValidator("json", citySchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateAdmin, createCity
);

// Update a city by ID
cityRouter.put("/update-cities/:id",authenticateAdmin, updateCity);

// Delete a city by ID
cityRouter.delete("/delete-cities/:id",authenticateAdmin, deleteCity);
