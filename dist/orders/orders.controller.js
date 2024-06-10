"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrder = void 0;
const orders_services_1 = require("./orders.services");
// Get order by ID
const getOrder = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const order = await (0, orders_services_1.getOrderService)(id);
        if (order === null) {
            return c.text("Order not found", 404);
        }
        return c.json(order, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrder = getOrder;
// Create an order
const createOrder = async (c) => {
    try {
        const order = await c.req.json();
        const createdOrder = await (0, orders_services_1.createOrderService)(order);
        if (!createdOrder)
            return c.text("Order not created", 404);
        return c.json({ msg: createdOrder }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOrder = createOrder;
// Update an order by ID
const updateOrder = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const order = await c.req.json();
    try {
        const searchedOrder = await (0, orders_services_1.getOrderService)(id);
        if (searchedOrder == undefined)
            return c.text("Order not found", 404);
        const res = await (0, orders_services_1.updateOrderService)(id, order);
        if (!res)
            return c.text("Order not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOrder = updateOrder;
// Delete an order by ID
const deleteOrder = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const order = await (0, orders_services_1.getOrderService)(id);
        if (order == undefined)
            return c.text("Order not found", 404);
        const res = await (0, orders_services_1.deleteOrderService)(id);
        if (!res)
            return c.text("Order not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteOrder = deleteOrder;
// export const searchOrders = async (c: Context) => {
//   try {
//       const query = c.req.query();
//       const orders = await searchOrdersService(query);
//       return c.json(orders, 200);
//   } catch (error: any) {
//       return c.json({ error: error?.message }, 400);
//   }
// }
