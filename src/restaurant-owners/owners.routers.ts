import { Hono } from "hono";
import { getRestaurantOwner, createRestaurantOwner, updateRestaurantOwner, deleteRestaurantOwner } from "./owners.controller";
import { zValidator } from "@hono/zod-validator";
import { ownersSchema} from "../validator";

export const ownersRouter = new Hono();

// Get a single RestaurantOwner relationship
ownersRouter.get("/restaurant_owners/:restaurant_id/:owner_id", getRestaurantOwner);

// Create a RestaurantOwner relationship
ownersRouter.post("/restaurant_owners",
    zValidator("json", ownersSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }),
    createRestaurantOwner);

// Update a RestaurantOwner relationship
ownersRouter.put("/restaurant_owners/:restaurant_id/:owner_id", updateRestaurantOwner);

// Delete a RestaurantOwner relationship
ownersRouter.delete("/restaurant_owners/:restaurant_id/:owner_id", deleteRestaurantOwner);
