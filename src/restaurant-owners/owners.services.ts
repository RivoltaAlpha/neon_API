import db from "../drizzle/db";
import { TIRestaurantOwner, TSRestaurantOwner, restaurant_owner } from "../drizzle/schema";
import { and, eq } from "drizzle-orm";

export const getRestaurantOwnerService = async (restaurant_id: number, owner_id: number): Promise<TSRestaurantOwner | undefined> => {
    return await db.query.restaurant_owner.findFirst({
        where: and(eq(restaurant_owner.restaurant_id, restaurant_id), eq(restaurant_owner.owner_id, owner_id))
    });
};

export const createRestaurantOwnerService = async (restaurantOwnerData: TIRestaurantOwner) => {
    await db.insert(restaurant_owner).values(restaurantOwnerData);
    return "Restaurant Owner relationship created successfully";
};

export const updateRestaurantOwnerService = async (restaurant_id: number, owner_id: number, restaurantOwnerData: TIRestaurantOwner) => {
    await db.update(restaurant_owner)
        .set(restaurantOwnerData)
        .where(and(eq(restaurant_owner.restaurant_id, restaurant_id), eq(restaurant_owner.owner_id, owner_id)));
    return "Restaurant Owner relationship updated successfully";
};

export const deleteRestaurantOwnerService = async (restaurant_id: number, owner_id: number) => {
    await db.delete(restaurant_owner)
        .where(and(eq(restaurant_owner.restaurant_id, restaurant_id), eq(restaurant_owner.owner_id, owner_id)));
    return "Restaurant Owner relationship deleted successfully";
};
