import { Hono } from "hono";
import { getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } from "./restaurant.controller";
import { zValidator } from "@hono/zod-validator";
import { restaurantSchema } from "../validator"; // Ensure you have a validator schema for restaurant data
import { authenticateUser, authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const restaurantRouter = new Hono();

// Get a single restaurant by ID: api/restaurants/1
restaurantRouter.get("/restaurants/:id", authenticateBoth, getRestaurant);

// Create a restaurant with validation
restaurantRouter.post(
  "/restaurants",
  zValidator('json', restaurantSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateAdmin,createRestaurant
);

// Update a restaurant by ID
restaurantRouter.put("/restaurants/:id",authenticateAdmin, updateRestaurant);

// Delete a restaurant by ID
restaurantRouter.delete("/restaurants/:id",authenticateAdmin, deleteRestaurant);
