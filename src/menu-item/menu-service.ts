import db from "../drizzle/db";
import { TIMenuItem, TSMenuItem, menu_item } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const listService = async (limit?: number): Promise<TSMenuItem[] | null> => {
    if (limit) {
        return await db.query.menu_item.findMany({
            limit: limit
        });
    }
    return await db.query.menu_item.findMany();
};

export async function  getMenuItemService(id: TSMenuItem['id']): Promise<Array<TSMenuItem>> {
    return db.select().from(menu_item).where(eq(menu_item.id, id));
};

export const createMenuItemService = async (menuItemData: TIMenuItem) => {
    await db.insert(menu_item).values(menuItemData);
    return "MenuItem created successfully";
};

export const updateMenuItemService = async (id: number, menuItemData: TIMenuItem) => {
    await db.update(menu_item).set(menuItemData).where(eq(menu_item.id, id));
    return "MenuItem updated successfully";
};

export const deleteMenuItemService = async (id: number) => {
    await db.delete(menu_item).where(eq(menu_item.id, id));
    return "MenuItem deleted successfully";
};
