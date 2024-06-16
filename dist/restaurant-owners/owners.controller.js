"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOwnedRestaurantsController = exports.deleteRestaurantOwner = exports.updateRestaurantOwner = exports.createRestaurantOwner = exports.getRestaurantOwner = exports.listOwners = void 0;
const owners_services_1 = require("./owners.services");
//list all
const listOwners = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, owners_services_1.listService)(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listOwners = listOwners;
// Get a single restaurant owner by ID
const getRestaurantOwner = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const owner = await (0, owners_services_1.getRestaurantOwnerService)(id);
        if (owner.length === 0) {
            return c.text("Restaurant Owner not found", 404);
        }
        return c.json(owner, 200);
    }
    catch (error) {
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
const getUserOwnedRestaurantsController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const restaurants = await (0, owners_services_1.getUserOwnedRestaurants)(id);
        if (restaurants.length === 0) {
            return c.text("No restaurants found for this user", 404);
        }
        return c.json(restaurants, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getUserOwnedRestaurantsController = getUserOwnedRestaurantsController;
