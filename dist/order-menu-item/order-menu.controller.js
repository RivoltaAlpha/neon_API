"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItem = exports.updateOrderMenuItem = exports.createOrderMenuItem = exports.getOrderMenuItem = void 0;
const order_menu_services_1 = require("./order-menu.services");
// Get OrderMenuItem
const getOrderMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const orderMenuItem = await (0, order_menu_services_1.getOrderMenuItemService)(id);
        if (orderMenuItem === null) {
            return c.text("OrderMenuItem not found", 404);
        }
        return c.json(orderMenuItem, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderMenuItem = getOrderMenuItem;
// Create OrderMenuItem
const createOrderMenuItem = async (c) => {
    try {
        const orderMenuItem = await c.req.json();
        const createdOrderMenuItem = await (0, order_menu_services_1.createOrderMenuItemService)(orderMenuItem);
        return c.json({ msg: createdOrderMenuItem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOrderMenuItem = createOrderMenuItem;
// Update OrderMenuItem
const updateOrderMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const orderMenuItem = await c.req.json();
        const updatedOrderMenuItem = await (0, order_menu_services_1.updateOrderMenuItemService)(id, orderMenuItem);
        return c.json({ msg: updatedOrderMenuItem }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOrderMenuItem = updateOrderMenuItem;
// Delete OrderMenuItem
const deleteOrderMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const deletedOrderMenuItem = await (0, order_menu_services_1.deleteOrderMenuItemService)(id);
        return c.json({ msg: deletedOrderMenuItem }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteOrderMenuItem = deleteOrderMenuItem;
