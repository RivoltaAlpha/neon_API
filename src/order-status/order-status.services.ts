import db from "../drizzle/db";
import { TIOrderStatus, TSOrderStatus, order_status } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const getOrderStatusService = async (id: number): Promise<TSOrderStatus | undefined> => {
    return await db.query.order_status.findFirst({
        where: eq(order_status.id, id)
    });
};

export const createOrderStatusService = async (orderStatus: TIOrderStatus) => {
    await db.insert(order_status).values(orderStatus);
    return "OrderStatus created successfully";
};

export const updateOrderStatusService = async (id: number, orderStatus: TIOrderStatus) => {
    await db.update(order_status).set(orderStatus).where(eq(order_status.id, id));
    return "OrderStatus updated successfully";
};

export const deleteOrderStatusService = async (id: number) => {
    await db.delete(order_status).where(eq(order_status.id, id));
    return "OrderStatus deleted successfully";
};
