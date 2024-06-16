"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMenuItemRouter = void 0;
const hono_1 = require("hono");
const order_menu_controller_1 = require("./order-menu.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_1 = require("../middleware/auth");
exports.orderMenuItemRouter = new hono_1.Hono();
//list all
exports.orderMenuItemRouter.get('/list-order-menu-items', auth_1.authenticateAdmin, order_menu_controller_1.getOrderMenuItem);
// Get a single OrderMenuItem
exports.orderMenuItemRouter.get("/order-menu-items/:id", auth_1.authenticateBoth, order_menu_controller_1.getOrderMenuItem);
// Create a OrderMenuItem
exports.orderMenuItemRouter.post("/order_menu_items", (0, zod_validator_1.zValidator)("json", validator_1.order_menu_itemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_1.authenticateAdmin, order_menu_controller_1.createOrderMenuItem);
// Update a OrderMenuItem
exports.orderMenuItemRouter.put("/update-order-menu-items/:id", auth_1.authenticateAdmin, order_menu_controller_1.updateOrderMenuItem);
// Delete a OrderMenuItem
exports.orderMenuItemRouter.delete("/delete-order-menu-items/:id", auth_1.authenticateAdmin, order_menu_controller_1.deleteOrderMenuItem);
