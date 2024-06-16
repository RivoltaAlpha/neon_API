"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const hono_1 = require("hono");
const orders_controller_1 = require("./orders.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_1 = require("../middleware/auth");
exports.orderRouter = new hono_1.Hono();
//list all
exports.orderRouter.get('/orders', auth_1.authenticateAdmin, orders_controller_1.listOrders);
// Get a single order by ID: api/orders/1
exports.orderRouter.get("/order/:id", auth_1.authenticateBoth, orders_controller_1.getOrder);
// Create an order
exports.orderRouter.post("/create-orders", (0, zod_validator_1.zValidator)("json", validator_1.orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_1.authenticateBoth, orders_controller_1.createOrder);
// Update an order by ID
exports.orderRouter.put("/update-order-update/:id", auth_1.authenticateBoth, orders_controller_1.updateOrder);
// Delete an order by ID
exports.orderRouter.delete("/delete-order-delete/:id", auth_1.authenticateBoth, orders_controller_1.deleteOrder);
// Get comments for an order
exports.orderRouter.get('/order/:id/comments', auth_1.authenticateBoth, orders_controller_1.OrderComments);
// Get driver for an order
exports.orderRouter.get('/order/:id/driver', auth_1.authenticateBoth, orders_controller_1.OrderDriver);
// Get address for an order
exports.orderRouter.get('/order/:id/address', auth_1.authenticateBoth, orders_controller_1.OrderAddress);
// Get user for an order
exports.orderRouter.get('/order/:id/user', auth_1.authenticateBoth, orders_controller_1.OrderUsers);
