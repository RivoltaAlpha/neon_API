import { Context } from "hono";
import { restaurantService,getRestaurantService, createRestaurantService, updateRestaurantService, deleteRestaurantService } from "./restaurant.services";

//search all 
export const listRestaurants = async (c: Context) => {
    try {
        //limit the number of users to be returned
  
        const limit = Number(c.req.query('limit'))
  
        const data = await restaurantService(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
  }

// Search restaurant
export const getRestaurant = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant = await getRestaurantService(id);
    if (restaurant == undefined) {
        return c.text("Restaurant not found", 404);
    }
    return c.json(restaurant, 200);
}

// Create restaurant
export const createRestaurant = async (c: Context) => {
    try {
        const restaurant = await c.req.json();
        const createdRestaurant = await createRestaurantService(restaurant);

        if (!createdRestaurant) return c.text("Restaurant not created", 404);
        return c.json({ msg: createdRestaurant }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Update restaurant
export const updateRestaurant = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant = await c.req.json();
    try {
        // Search for the restaurant
        const searchedRestaurant = await getRestaurantService(id);
        if (searchedRestaurant == undefined) return c.text("Restaurant not found", 404);
        // Get the data and update it
        const res = await updateRestaurantService(id, restaurant);
        // Return a success message
        if (!res) return c.text("Restaurant not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Delete restaurant
export const deleteRestaurant = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        // Search for the restaurant
        const restaurant = await getRestaurantService(id);
        if (restaurant == undefined) return c.text("Restaurant not found", 404);
        // Deleting the restaurant
        const res = await deleteRestaurantService(id);
        if (!res) return c.text("Restaurant not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
