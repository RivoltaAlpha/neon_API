import { Hono } from "hono";
import { getRestaurantOwner, createRestaurantOwner, updateRestaurantOwner, deleteRestaurantOwner } from "./owners.controller";
import { zValidator } from "@hono/zod-validator";
import { ownersSchema} from "../validator";
import { authenticateAdmin, authenticateBoth } from "../middleware/auth";


export const ownersRouter = new Hono();
// list all owners
ownersRouter.get('/owners', authenticateBoth, getRestaurantOwner);

// Get a single RestaurantOwner relationship
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
