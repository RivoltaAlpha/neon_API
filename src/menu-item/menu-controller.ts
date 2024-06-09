import { Context } from "hono";
import {
    getMenuItemService,
    createMenuItemService,
    updateMenuItemService,
    deleteMenuItemService
} from "./menu-service";

// Get MenuItem
export const getMenuItem = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const menuItem = await getMenuItemService(id);
        if (menuItem === null) {
            return c.text("MenuItem not found", 404);
        }
        return c.json(menuItem, 200);
    } catch (error: any) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};

// Create MenuItem
export const createMenuItem = async (c: Context) => {
    try {
        const menuItemData = await c.req.json();
        const createdMenuItem = await createMenuItemService(menuItemData);

        return c.json({ msg: createdMenuItem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update MenuItem
export const updateMenuItem = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const menuItemData = await c.req.json();
        const updatedMenuItem = await updateMenuItemService(id, menuItemData);

        return c.json({ msg: updatedMenuItem }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete MenuItem
export const deleteMenuItem = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const deletedMenuItem = await deleteMenuItemService(id);

        return c.json({ msg: deletedMenuItem }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
