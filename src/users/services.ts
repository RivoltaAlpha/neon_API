import  db  from '../drizzle/db';
import { eq } from 'drizzle-orm';
import { TIUser, TSUser,TSOrder, TSComment,TSRestaurantOwner, users, comment,restaurant,restaurant_owner, city,orders } from "../drizzle/schema";

export const usersService = async (limit?: number): Promise<TSUser[] | null> => {
    if (limit) {
        return await db.query.users.findMany({
            limit: limit
        });
    }
    return await db.query.users.findMany();
};

export async function getUserById(id: TSUser['id']): Promise<Array<TSUser>> {
    return db.select().from(users).where(eq(users.id, id));
}

export async function createUserService(data: TIUser) {
    await db.insert(users).values(data);
    return "User created successfully";
}

export async function updateUserService(id: number, user: TIUser) {
    await db.update(users).set(user).where(eq(users.id, id));
    return "User updated successfully";
}

export async function deleteUserService(id: number) {
    await db.delete(users).where(eq(users.id, id));
    return "User deleted successfully";
}

export async function getUserOrders(id: TSOrder['id']): Promise<any[]> {
    return db.select({
        user: {
            id: users.id,
            name: users.name,
            email: users.email,
            contact_phone: users.contact_phone
            },
            orders:{
                id: orders.id,
                restaurant_id:orders.restaurant_id,
                order_delivery: orders.driver_id,
                order_date: orders.delivery_address_id
            }
    } 
    ).from(orders).where(eq(orders.user_id, id));
}

export async function getUserComments(id: TSComment['id']): Promise<any[]> {
    return db.select({
        comment: {
            id: comment.id,
            user: users.name,
            text: comment.comment
        },
    }).from(comment).where(eq(comment.user_id, id));
}

export async function getUserOwnedRestaurants(id: TSRestaurantOwner['owner_id']): Promise<any[]> {
    return db.select({
        restaurant: {
            id: restaurant.id,
            name: restaurant.name,
            address: restaurant.street_address,
            owner: restaurant_owner.owner_id,
        },
        city: {
            id: city.id,
            name: city.name
        },
        user: {
            id: users.id,
            name: users.name
        }
    })
    .from(restaurant_owner)
    .innerJoin(restaurant, eq(restaurant_owner.restaurant_id, restaurant.id))
    .innerJoin(city, eq(restaurant.city_id, city.id))
    .innerJoin(users, eq(restaurant_owner.owner_id, users.id))
    .where(eq(restaurant_owner.owner_id, id));
}