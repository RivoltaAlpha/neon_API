import { Context } from "hono";
import {
    getOrderStatusService,
    createOrderStatusService,
    updateOrderStatusService,
    deleteOrderStatusService,
    listService
} from "./order-status.services";
//get all
export const listOrderStatus = async (c: Context) => {
    try {
        //limit the number of users to be returned
  
        const limit = Number(c.req.query('limit'))
  
        const data = await listService(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
  }

// Get OrderStatus
export const getOrderStatus = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const orderStatus = await getOrderStatusService(id);
        if (orderStatus === null) {
            return c.text("OrderStatus not found", 404);
        }
        return c.json(orderStatus, 200);
    } catch (error: any) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};

// Create OrderStatus
export const createOrderStatus = async (c: Context) => {
    try {
        const orderStatus = await c.req.json();
        const createdOrderStatus = await createOrderStatusService(orderStatus);

        return c.json({ msg: createdOrderStatus }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update OrderStatus
export const updateOrderStatus = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const orderStatus = await c.req.json();
        const updatedOrderStatus = await updateOrderStatusService(id, orderStatus);

        return c.json({ msg: updatedOrderStatus }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete OrderStatus
export const deleteOrderStatus = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const deletedOrderStatus = await deleteOrderStatusService(id);

        return c.json({ msg: deletedOrderStatus }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
