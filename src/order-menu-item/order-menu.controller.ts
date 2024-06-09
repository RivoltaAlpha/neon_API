import { Context } from "hono";
import {
    getOrderMenuItemService,
    createOrderMenuItemService,
    updateOrderMenuItemService,
    deleteOrderMenuItemService
} from "./order-menu.services";

// Get OrderMenuItem
export const getOrderMenuItem = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const orderMenuItem = await getOrderMenuItemService(id);
        if (orderMenuItem === null) {
            return c.text("OrderMenuItem not found", 404);
        }
        return c.json(orderMenuItem, 200);
    } catch (error: any) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};

// Create OrderMenuItem
export const createOrderMenuItem = async (c: Context) => {
    try {
        const orderMenuItem = await c.req.json();
        const createdOrderMenuItem = await createOrderMenuItemService(orderMenuItem);

        return c.json({ msg: createdOrderMenuItem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update OrderMenuItem
export const updateOrderMenuItem = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const orderMenuItem = await c.req.json();
        const updatedOrderMenuItem = await updateOrderMenuItemService(id, orderMenuItem);

        return c.json({ msg: updatedOrderMenuItem }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete OrderMenuItem
export const deleteOrderMenuItem = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const deletedOrderMenuItem = await deleteOrderMenuItemService(id);

        return c.json({ msg: deletedOrderMenuItem }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
