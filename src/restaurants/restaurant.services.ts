import { eq, and } from "drizzle-orm";
import  db  from '../drizzle/db';
import { TIRestaurant,TSRestaurant, restaurant, restaurant_owner, menu_item, orders, city, users  } from "../drizzle/schema";

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

// additional functionalities
export const getRestaurantDetailsService = async (restaurantId: number): Promise<any> => {
    return db.select({
        restaurant: {
            Restaurant_id: restaurant.id,
            Restaurant_name: restaurant.name,
            street_address: restaurant.street_address,
            zip_code: restaurant.zip_code,
            created_at: restaurant.created_at,
            updated_at: restaurant.updated_at,
        },
        city: {
            id: city.id,
            name: city.name,
        },
        owners: {
            id: restaurant_owner.owner_id,
            name: users.name,
            email: users.email,
        },
        menuItems: {
            id: menu_item.id,
            name: menu_item.name,
            price: menu_item.price,
        },
        orders: {
            id: orders.id,
            price: orders.price,
            discount: orders.discount,
            final_price: orders.final_price,
            created_at: orders.created_at,
            updated_at: orders.updated_at,
        }
    })
    .from(restaurant)
    .innerJoin(city, eq(restaurant.city_id, city.id))
    .innerJoin(restaurant_owner, eq(restaurant.id, restaurant_owner.restaurant_id))
    .innerJoin(users, eq(restaurant_owner.owner_id, users.id))
    .innerJoin(menu_item, eq(restaurant.id, menu_item.restaurant_id))
    .innerJoin(orders, eq(restaurant.id, orders.restaurant_id))
    .where(eq(restaurant.id, restaurantId));
};