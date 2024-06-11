import { Context } from "hono";
import {
    getRestaurantOwnerService,
    createRestaurantOwnerService,
    updateRestaurantOwnerService,
    deleteRestaurantOwnerService,
    listService
} from "./owners.services";
//list all
export const listUsers = async (c: Context) => {
    try {
        //limit the number of users to be returned
  
        const limit = Number(c.req.query('limit'))
  
        const data = await listService(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
  }

// Get RestaurantOwner
export const getRestaurantOwner = async (c: Context) => {
    try {
        const restaurant_id = parseInt(c.req.param("restaurant_id"));
        const owner_id = parseInt(c.req.param("owner_id"));
        if (isNaN(restaurant_id) || isNaN(owner_id)) return c.text("Invalid ID", 400);

        const restaurantOwner = await getRestaurantOwnerService(owner_id);
        if (restaurantOwner === null) {
            return c.text("Restaurant Owner relationship not found", 404);
        }
        return c.json(restaurantOwner, 200);
    } catch (error: any) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};

// Create RestaurantOwner
export const createRestaurantOwner = async (c: Context) => {
    try {
        const restaurantOwnerData = await c.req.json();
        const createdRestaurantOwner = await createRestaurantOwnerService(restaurantOwnerData);

        return c.json({ msg: createdRestaurantOwner }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update RestaurantOwner
export const updateRestaurantOwner = async (c: Context) => {
    try {
        const restaurant_id = parseInt(c.req.param("restaurant_id"));
        const owner_id = parseInt(c.req.param("owner_id"));
        if (isNaN(restaurant_id) || isNaN(owner_id)) return c.text("Invalid ID", 400);

        const restaurantOwnerData = await c.req.json();
        const updatedRestaurantOwner = await updateRestaurantOwnerService(restaurant_id, owner_id, restaurantOwnerData);

        return c.json({ msg: updatedRestaurantOwner }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete RestaurantOwner
export const deleteRestaurantOwner = async (c: Context) => {
    try {
        const restaurant_id = parseInt(c.req.param("restaurant_id"));
        const owner_id = parseInt(c.req.param("owner_id"));
        if (isNaN(restaurant_id) || isNaN(owner_id)) return c.text("Invalid ID", 400);

        const deletedRestaurantOwner = await deleteRestaurantOwnerService(restaurant_id, owner_id);

        return c.json({ msg: deletedRestaurantOwner }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
