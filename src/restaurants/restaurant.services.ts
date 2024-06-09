import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIRestaurant,TSRestaurant, restaurant } from "../drizzle/schema";

// Get a single restaurant by ID
export const getRestaurantService = async (id: number): Promise<TSRestaurant | undefined> => {
    return await db.query.restaurant.findFirst({
        where: eq(restaurant.id, id)
    });
};

// Create a new restaurant
export const createRestaurantService = async (restaurantData: TIRestaurant) => {
    await db.insert(restaurant).values(restaurantData);
    return "Restaurant created successfully";
};

// Update an existing restaurant by ID
export const updateRestaurantService = async (id: number, restaurantData: TIRestaurant) => {
    await db.update(restaurant).set(restaurantData).where(eq(restaurant.id, id));
    return "Restaurant updated successfully";
};

// Delete a restaurant by ID
export const deleteRestaurantService = async (id: number) => {
    await db.delete(restaurant).where(eq(restaurant.id, id));
    return "Restaurant deleted successfully";
};
