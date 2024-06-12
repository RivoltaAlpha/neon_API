import { Hono } from "hono";
import { listOwners,getRestaurantOwner, createRestaurantOwner, updateRestaurantOwner, deleteRestaurantOwner,getUserOwnedRestaurantsController } from "./owners.controller";
import { zValidator } from "@hono/zod-validator";
import { ownersSchema} from "../validator";
import { authenticateAdmin, authenticateBoth } from "../middleware/auth";


export const ownersRouter = new Hono();
// List all owners
ownersRouter.get('/restaurant-owners/list', authenticateBoth, listOwners);

// Get a single RestaurantOwner relationship by owner ID
//ownersRouter.get('/restaurant-owner/:id', authenticateBoth, getRestaurantOwner);

// Get a single RestaurantOwner relationship by restaurant ID and owner ID
ownersRouter.get("/restaurant_owners/:restaurant_id/:owner_id", authenticateBoth, getRestaurantOwner);

// Create a RestaurantOwner relationship
ownersRouter.post("/restaurant_owners",
    zValidator("json", ownersSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }),
    authenticateAdmin,createRestaurantOwner);

// Update a RestaurantOwner relationship
ownersRouter.put("/restaurant_owners/:restaurant_id/:owner_id",authenticateAdmin, updateRestaurantOwner);

// Delete a RestaurantOwner relationship
ownersRouter.delete("/restaurant_owners/:restaurant_id/:owner_id",authenticateAdmin, deleteRestaurantOwner);

// Get user-owned restaurants
ownersRouter.get("/restaurant-owners/:id/owned-restaurants", authenticateBoth, getUserOwnedRestaurantsController);
