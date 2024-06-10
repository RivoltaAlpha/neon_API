"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatus = exports.updateOrderStatus = exports.createOrderStatus = exports.getOrderStatus = void 0;
const order_status_services_1 = require("./order-status.services");
// Get OrderStatus
const getOrderStatus = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const orderStatus = await (0, order_status_services_1.getOrderStatusService)(id);
        if (orderStatus === null) {
            return c.text("OrderStatus not found", 404);
        }
        return c.json(orderStatus, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderStatus = getOrderStatus;
// Create OrderStatus
const createOrderStatus = async (c) => {
    try {
        const orderStatus = await c.req.json();
        const createdOrderStatus = await (0, order_status_services_1.createOrderStatusService)(orderStatus);
        return c.json({ msg: createdOrderStatus }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOrderStatus = createOrderStatus;
// Update OrderStatus
const updateOrderStatus = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const orderStatus = await c.req.json();
        const updatedOrderStatus = await (0, order_status_services_1.updateOrderStatusService)(id, orderStatus);
        return c.json({ msg: updatedOrderStatus }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOrderStatus = updateOrderStatus;
// Delete OrderStatus
const deleteOrderStatus = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const deletedOrderStatus = await (0, order_status_services_1.deleteOrderStatusService)(id);
        return c.json({ msg: deletedOrderStatus }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteOrderStatus = deleteOrderStatus;
