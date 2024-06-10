"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemRouter = void 0;
const hono_1 = require("hono");
const menu_controller_1 = require("./menu-controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.menuItemRouter = new hono_1.Hono();
// Get a single MenuItem
exports.menuItemRouter.get("/menu_items/:id", menu_controller_1.getMenuItem);
// Create a MenuItem
exports.menuItemRouter.post("/menu_items", (0, zod_validator_1.zValidator)("json", validator_1.menu_itemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), menu_controller_1.createMenuItem);
// Update a MenuItem
exports.menuItemRouter.put("/menu_items/:id", menu_controller_1.updateMenuItem);
// Delete a MenuItem
exports.menuItemRouter.delete("/menu_items/:id", menu_controller_1.deleteMenuItem);
