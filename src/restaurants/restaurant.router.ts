import { Hono } from "hono";
import { getRestaurantDetailsController,listRestaurants,getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } from "./restaurant.controller";
import { zValidator } from "@hono/zod-validator";
import { restaurantSchema } from "../validator"; // Ensure you have a validator schema for restaurant data
import { authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const restaurantRouter = new Hono();

// Get a single restaurant by ID: api/restaurants/1
restaurantRouter.get("/restaurants/:id", authenticateBoth, getRestaurant);
// list all
restaurantRouter.get("/restaurants", authenticateBoth, listRestaurants);

// Create a restaurant with validation
restaurantRouter.post(
  "/create-restaurant",
  zValidator('json', restaurantSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateAdmin,createRestaurant
);

// Update a restaurant by ID
restaurantRouter.put("/update-restaurants/:id",authenticateAdmin, updateRestaurant);

// Delete a restaurant by ID
restaurantRouter.delete("/delete-restaurants/:id",authenticateAdmin, deleteRestaurant);

// Get details of a specific restaurant
restaurantRouter.get('/restaurant/:id/details', authenticateBoth, getRestaurantDetailsController);

