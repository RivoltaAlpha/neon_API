"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const hono_1 = require("hono");
const orders_controller_1 = require("./orders.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_1 = require("../middleware/auth");
exports.orderRouter = new hono_1.Hono();
exports.orderRouter.use('*', auth_1.authenticateAdmin);
// Get a single order by ID: api/orders/1
exports.orderRouter.get("/orders/:id", auth_1.authenticateUser, orders_controller_1.getOrder);
// Create an order
exports.orderRouter.post("/orders", (0, zod_validator_1.zValidator)("json", validator_1.orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_1.authenticateUser, orders_controller_1.createOrder);
// Update an order by ID
exports.orderRouter.put("/orders/:id", orders_controller_1.updateOrder);
// Delete an order by ID
exports.orderRouter.delete("/orders/:id", orders_controller_1.deleteOrder);
// orderRouter.get("/orders/search", searchOrders);
