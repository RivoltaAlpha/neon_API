import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrder, TSOrder, orders, comment, driver, address, order_status, users, order_menu_item } from "../drizzle/schema";

export const listService = async (limit?: number): Promise<TSOrder[] | null> => {
    if (limit) {
        return await db.query.orders.findMany({
            limit: limit
        });
    }
    return await db.query.orders.findMany();
};

// List all orders with related details
export const listOtherAssociatedServices = async (limit?: number): Promise<any[]> => {
    const query = db.select()
        .from(orders)
        .leftJoin(comment, eq(orders.id, comment.order_id)) // Might not have comments
        .innerJoin(driver, eq(orders.driver_id, driver.id)) // Each order should have a driver
        .innerJoin(address, eq(orders.delivery_address_id, address.id)) // Each order should have an address
        .innerJoin(users, eq(orders.user_id, users.id)) // Each order should have a user

    if (limit) {
        query.limit(limit);
    }

    return query;
};


export async function getOrderService(id: TSOrder['id']): Promise<Array<TSOrder>> {
    return db.select().from(orders).where(eq(orders.id, id));
}

export const createOrderService = async (orderData: TIOrder) => {

    await db.insert(orders).values(orderData)
    return "Order created successfully";
}

export const updateOrderService = async (id: number, orderData: TIOrder) => {
    await db.update(orders).set(orderData).where(eq(orders.id, id))
    return "Order updated successfully";
}

export const deleteOrderService = async (id: number) => {
    await db.delete(orders).where(eq(orders.id, id))
    return "Order deleted successfully";
}
// Additional services to get related data
export const getOrderComments = async (orderId: TSOrder['id']): Promise<any[]> => {
    return db.select().from(comment).where(eq(comment.order_id, orderId));
}

export const getOrderDriver = async (orderId: TSOrder['id']): Promise<any[]> => {
    return db.select()
        .from(orders)
        .innerJoin(driver, eq(orders.driver_id, driver.id))
        .where(eq(orders.id, orderId));
}

export const getOrderAddress = async (orderId: TSOrder['id']): Promise<any[]> => {
    return db.select()
        .from(orders)
        .innerJoin(address, eq(orders.delivery_address_id, address.id))
        .where(eq(orders.id, orderId));
}

export const getOrderUser = async (orderId: TSOrder['id']): Promise<any[]> => {
    return db.select()
        .from(orders)
        .innerJoin(users, eq(orders.user_id, users.id))
        .where(eq(orders.id, orderId));
}


