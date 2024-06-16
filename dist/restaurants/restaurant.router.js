"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const hono_1 = require("hono");
const restaurant_controller_1 = require("./restaurant.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator"); // Ensure you have a validator schema for restaurant data
const auth_1 = require("../middleware/auth");
exports.restaurantRouter = new hono_1.Hono();
// Get a single restaurant by ID: api/restaurants/1
exports.restaurantRouter.get("/restaurants/:id", auth_1.authenticateBoth, restaurant_controller_1.getRestaurant);
// list all
exports.restaurantRouter.get("/restaurants", auth_1.authenticateBoth, restaurant_controller_1.listRestaurants);
// Create a restaurant with validation
exports.restaurantRouter.post("/create-restaurant", (0, zod_validator_1.zValidator)('json', validator_1.restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_1.authenticateAdmin, restaurant_controller_1.createRestaurant);
// Update a restaurant by ID
exports.restaurantRouter.put("/update-restaurants/:id", auth_1.authenticateAdmin, restaurant_controller_1.updateRestaurant);
// Delete a restaurant by ID
exports.restaurantRouter.delete("/delete-restaurants/:id", auth_1.authenticateAdmin, restaurant_controller_1.deleteRestaurant);
// Get details of a specific restaurant
exports.restaurantRouter.get('/restaurant/:id/details', auth_1.authenticateBoth, restaurant_controller_1.getRestaurantDetailsController);
