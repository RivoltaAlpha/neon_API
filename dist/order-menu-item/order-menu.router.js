"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMenuItemRouter = void 0;
const hono_1 = require("hono");
const order_menu_controller_1 = require("./order-menu.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.orderMenuItemRouter = new hono_1.Hono();
// Get a single OrderMenuItem
exports.orderMenuItemRouter.get("/order_menu_items/:id", order_menu_controller_1.getOrderMenuItem);
// Create a OrderMenuItem
exports.orderMenuItemRouter.post("/order_menu_items", (0, zod_validator_1.zValidator)("json", validator_1.order_menu_itemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), order_menu_controller_1.createOrderMenuItem);
// Update a OrderMenuItem
exports.orderMenuItemRouter.put("/order_menu_items/:id", order_menu_controller_1.updateOrderMenuItem);
// Delete a OrderMenuItem
exports.orderMenuItemRouter.delete("/order_menu_items/:id", order_menu_controller_1.deleteOrderMenuItem);
