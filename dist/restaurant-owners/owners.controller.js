"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwner = exports.updateRestaurantOwner = exports.createRestaurantOwner = exports.getRestaurantOwner = void 0;
const owners_services_1 = require("./owners.services");
// Get RestaurantOwner
const getRestaurantOwner = async (c) => {
    try {
        const restaurant_id = parseInt(c.req.param("restaurant_id"));
        const owner_id = parseInt(c.req.param("owner_id"));
        if (isNaN(restaurant_id) || isNaN(owner_id))
            return c.text("Invalid ID", 400);
        const restaurantOwner = await (0, owners_services_1.getRestaurantOwnerService)(owner_id);
        if (restaurantOwner === null) {
            return c.text("Restaurant Owner relationship not found", 404);
        }
        return c.json(restaurantOwner, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getRestaurantOwner = getRestaurantOwner;
// Create RestaurantOwner
const createRestaurantOwner = async (c) => {
    try {
        const restaurantOwnerData = await c.req.json();
        const createdRestaurantOwner = await (0, owners_services_1.createRestaurantOwnerService)(restaurantOwnerData);
        return c.json({ msg: createdRestaurantOwner }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createRestaurantOwner = createRestaurantOwner;
// Update RestaurantOwner
const updateRestaurantOwner = async (c) => {
    try {
        const restaurant_id = parseInt(c.req.param("restaurant_id"));
        const owner_id = parseInt(c.req.param("owner_id"));
        if (isNaN(restaurant_id) || isNaN(owner_id))
            return c.text("Invalid ID", 400);
        const restaurantOwnerData = await c.req.json();
        const updatedRestaurantOwner = await (0, owners_services_1.updateRestaurantOwnerService)(restaurant_id, owner_id, restaurantOwnerData);
        return c.json({ msg: updatedRestaurantOwner }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateRestaurantOwner = updateRestaurantOwner;
// Delete RestaurantOwner
const deleteRestaurantOwner = async (c) => {
    try {
        const restaurant_id = parseInt(c.req.param("restaurant_id"));
        const owner_id = parseInt(c.req.param("owner_id"));
        if (isNaN(restaurant_id) || isNaN(owner_id))
            return c.text("Invalid ID", 400);
        const deletedRestaurantOwner = await (0, owners_services_1.deleteRestaurantOwnerService)(restaurant_id, owner_id);
        return c.json({ msg: deletedRestaurantOwner }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteRestaurantOwner = deleteRestaurantOwner;
