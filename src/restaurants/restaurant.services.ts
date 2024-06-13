import { eq, and } from "drizzle-orm";
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

// additional functionalities
export const getRestaurantDetailsService =  async (id: number) => {
    return await db.query.restaurant.findMany({
      where: (fields, { eq }) => eq(fields.id, id),
      columns: {
        id: true,
        name: true,
        street_address: true,
      },
      with: {
        city: {
            columns: {
              name: true,
            },
            with: {
              state: {
                columns: {
                  name: true,
                },
              },
            },
          },
          owners:{
            columns: {
                owner_id: true,
                },
                with: {
                    owner: {
                        columns: {
                            name: true,
                            },
                    },
                },
          },
          menu_items:{
            columns: {
                id: true,
                name: true,
                price: true,
                },
          },
          orders:{
            columns: {
            id: true,
            price: true,
            final_price: true,
          }
      },
    },
 });
  }
