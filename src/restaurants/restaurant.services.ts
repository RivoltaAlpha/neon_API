import { eq } from "drizzle-orm";
import  db  from '../drizzle/db';
import { TIRestaurant,TSRestaurant, restaurant } from "../drizzle/schema";

export const restaurantService = async (limit?: number): Promise<TSRestaurant[] | null> => {
    if (limit) {
        return await db.query.restaurant.findMany({
            limit: limit
        });
    }
    return await db.query.restaurant.findMany();
};

// Get a single restaurant by ID
export async function  getRestaurantService(id: TSRestaurant['id']): Promise<Array<TSRestaurant>> {
    return db.select().from(restaurant).where(eq(restaurant.id, id));
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
