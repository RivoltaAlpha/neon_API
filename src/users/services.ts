import  db  from '../drizzle/db';
import { eq } from 'drizzle-orm';
import { TIUser, TSUser,TSOrder, TSComment, TSRestaurantOwner, users, comment,orders, restaurant_owner } from "../drizzle/schema";

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
    return db.select().from(orders).where(eq(orders.user_id, id));
}

export async function getUserComments(id: TSComment['id']): Promise<any[]> {
    return db.select().from(comment).where(eq(comment.user_id, id));
}

export async function getUserOwnedRestaurants(id: TSRestaurantOwner['owner_id']): Promise<any[]> {
    return db.select().from(restaurant_owner).where(eq(restaurant_owner.owner_id, id));
}
