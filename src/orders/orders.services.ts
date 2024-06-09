import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { TIOrder, TSOrder, orders } from "../drizzle/schema";

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

export async function searchOrdersService = async (orderData :TIOrder) => {

}

