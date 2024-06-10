"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const hono_1 = require("hono");
const restaurant_controller_1 = require("./restaurant.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator"); // Ensure you have a validator schema for restaurant data
exports.restaurantRouter = new hono_1.Hono();
// Get a single restaurant by ID: api/restaurants/1
exports.restaurantRouter.get("/restaurants/:id", restaurant_controller_1.getRestaurant);
// Create a restaurant with validation
exports.restaurantRouter.post("/restaurants", (0, zod_validator_1.zValidator)('json', validator_1.restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), restaurant_controller_1.createRestaurant);
// Update a restaurant by ID
exports.restaurantRouter.put("/restaurants/:id", restaurant_controller_1.updateRestaurant);
// Delete a restaurant by ID
exports.restaurantRouter.delete("/restaurants/:id", restaurant_controller_1.deleteRestaurant);
