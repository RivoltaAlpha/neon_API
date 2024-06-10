"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusRouter = void 0;
const hono_1 = require("hono");
const order_status_controller_1 = require("./order-status.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.orderStatusRouter = new hono_1.Hono();
// Get a single OrderStatus
exports.orderStatusRouter.get("/order_statuses/:id", order_status_controller_1.getOrderStatus);
// Create a OrderStatus
exports.orderStatusRouter.post("/order_statuses", (0, zod_validator_1.zValidator)("json", validator_1.order_statusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), order_status_controller_1.createOrderStatus);
// Update a OrderStatus
exports.orderStatusRouter.put("/order_statuses/:id", order_status_controller_1.updateOrderStatus);
// Delete a OrderStatus
exports.orderStatusRouter.delete("/order_statuses/:id", order_status_controller_1.deleteOrderStatus);
