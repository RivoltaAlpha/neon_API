import db from "../drizzle/db";
import { TIOrderMenuItem, TSOrderMenuItem, order_menu_item } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const getOrderMenuItemService = async (id: number): Promise<TSOrderMenuItem | undefined> => {
    return await db.query.order_menu_item.findFirst({
        where: eq(order_menu_item.id, id)
    });
};

export const createOrderMenuItemService = async (orderMenuItem: TIOrderMenuItem) => {
    await db.insert(order_menu_item).values(orderMenuItem);
    return "OrderMenuItem created successfully";
};

export const updateOrderMenuItemService = async (id: number, orderMenuItem: TIOrderMenuItem) => {
    await db.update(order_menu_item).set(orderMenuItem).where(eq(order_menu_item.id, id));
    return "OrderMenuItem updated successfully";
};

export const deleteOrderMenuItemService = async (id: number) => {
    await db.delete(order_menu_item).where(eq(order_menu_item.id, id));
    return "OrderMenuItem deleted successfully";
};
