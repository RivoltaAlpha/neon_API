"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownersRouter = void 0;
const hono_1 = require("hono");
const owners_controller_1 = require("./owners.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_1 = require("../middleware/auth");
exports.ownersRouter = new hono_1.Hono();
// List all owners
exports.ownersRouter.get('/restaurant-owners/list', auth_1.authenticateBoth, owners_controller_1.listOwners);
// Get a single RestaurantOwner relationship by owner ID
//ownersRouter.get('/restaurant-owner/:id', authenticateBoth, getRestaurantOwner);
// Get a single RestaurantOwner relationship by restaurant ID and owner ID
exports.ownersRouter.get("/restaurant_owners/:restaurant_id/:owner_id", auth_1.authenticateBoth, owners_controller_1.getRestaurantOwner);
// Create a RestaurantOwner relationship
exports.ownersRouter.post("/restaurant_owners", (0, zod_validator_1.zValidator)("json", validator_1.ownersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_1.authenticateAdmin, owners_controller_1.createRestaurantOwner);
// Update a RestaurantOwner relationship
exports.ownersRouter.put("/restaurant_owners/:restaurant_id/:owner_id", auth_1.authenticateAdmin, owners_controller_1.updateRestaurantOwner);
// Delete a RestaurantOwner relationship
exports.ownersRouter.delete("/restaurant_owners/:restaurant_id/:owner_id", auth_1.authenticateAdmin, owners_controller_1.deleteRestaurantOwner);
// Get user-owned restaurants
exports.ownersRouter.get("/restaurant-owners/:id/owned-restaurants", auth_1.authenticateBoth, owners_controller_1.getUserOwnedRestaurantsController);
