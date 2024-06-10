"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownersRouter = void 0;
const hono_1 = require("hono");
const owners_controller_1 = require("./owners.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.ownersRouter = new hono_1.Hono();
// Get a single RestaurantOwner relationship
exports.ownersRouter.get("/restaurant_owners/:restaurant_id/:owner_id", owners_controller_1.getRestaurantOwner);
// Create a RestaurantOwner relationship
exports.ownersRouter.post("/restaurant_owners", (0, zod_validator_1.zValidator)("json", validator_1.ownersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), owners_controller_1.createRestaurantOwner);
// Update a RestaurantOwner relationship
exports.ownersRouter.put("/restaurant_owners/:restaurant_id/:owner_id", owners_controller_1.updateRestaurantOwner);
// Delete a RestaurantOwner relationship
exports.ownersRouter.delete("/restaurant_owners/:restaurant_id/:owner_id", owners_controller_1.deleteRestaurantOwner);
