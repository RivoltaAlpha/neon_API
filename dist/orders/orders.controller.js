"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUsers = exports.OrderAddress = exports.OrderDriver = exports.OrderComments = exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrder = exports.listOrders = void 0;
const orders_services_1 = require("./orders.services");
//get all
const listOrders = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, orders_services_1.listService)(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listOrders = listOrders;
// Get order by ID
const getOrder = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const order = await (0, orders_services_1.getOrderDetails)(id);
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
// Get comments for an order
const OrderComments = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const comments = await (0, orders_services_1.getOrderComments)(id);
        if (comments === null || comments.length === 0) {
            return c.text("No comments found for this order", 404);
        }
        return c.json(comments, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.OrderComments = OrderComments;
// Get driver for an order
const OrderDriver = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const driver = await (0, orders_services_1.getOrderDriver)(id);
        if (driver === null || driver.length === 0) {
            return c.text("No driver found for this order", 404);
        }
        return c.json(driver, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.OrderDriver = OrderDriver;
// Get address for an order
const OrderAddress = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const address = await (0, orders_services_1.getOrderAddress)(id);
        if (address === null || address.length === 0) {
            return c.text("No address found for this order", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.OrderAddress = OrderAddress;
// Get user for an order
const OrderUsers = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const user = await (0, orders_services_1.getOrderUser)(id);
        if (user === null || user.length === 0) {
            return c.text("No user found for this order", 404);
        }
        return c.json(user, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.OrderUsers = OrderUsers;
