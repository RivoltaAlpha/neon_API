"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.createRestaurant = exports.getRestaurant = void 0;
const restaurant_services_1 = require("./restaurant.services");
// Search restaurant
const getRestaurant = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const restaurant = await (0, restaurant_services_1.getRestaurantService)(id);
    if (restaurant == undefined) {
        return c.text("Restaurant not found", 404);
    }
    return c.json(restaurant, 200);
};
exports.getRestaurant = getRestaurant;
// Create restaurant
const createRestaurant = async (c) => {
    try {
        const restaurant = await c.req.json();
        const createdRestaurant = await (0, restaurant_services_1.createRestaurantService)(restaurant);
        if (!createdRestaurant)
            return c.text("Restaurant not created", 404);
        return c.json({ msg: createdRestaurant }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createRestaurant = createRestaurant;
// Update restaurant
const updateRestaurant = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const restaurant = await c.req.json();
    try {
        // Search for the restaurant
        const searchedRestaurant = await (0, restaurant_services_1.getRestaurantService)(id);
        if (searchedRestaurant == undefined)
            return c.text("Restaurant not found", 404);
        // Get the data and update it
        const res = await (0, restaurant_services_1.updateRestaurantService)(id, restaurant);
        // Return a success message
        if (!res)
            return c.text("Restaurant not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateRestaurant = updateRestaurant;
// Delete restaurant
const deleteRestaurant = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        // Search for the restaurant
        const restaurant = await (0, restaurant_services_1.getRestaurantService)(id);
        if (restaurant == undefined)
            return c.text("Restaurant not found", 404);
        // Deleting the restaurant
        const res = await (0, restaurant_services_1.deleteRestaurantService)(id);
        if (!res)
            return c.text("Restaurant not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteRestaurant = deleteRestaurant;
