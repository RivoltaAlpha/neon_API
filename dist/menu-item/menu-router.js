"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemRouter = void 0;
const hono_1 = require("hono");
const menu_controller_1 = require("./menu-controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_1 = require("../middleware/auth");
exports.menuItemRouter = new hono_1.Hono();
//list all
exports.menuItemRouter.get('/list-menu-items', auth_1.authenticateBoth, menu_controller_1.listUsers);
// Get a single MenuItem
exports.menuItemRouter.get("/menu-item/:id", auth_1.authenticateBoth, menu_controller_1.getMenuItem);
// Create a MenuItem
exports.menuItemRouter.post("/create-menu-items", (0, zod_validator_1.zValidator)("json", validator_1.menu_itemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_1.authenticateAdmin, menu_controller_1.createMenuItem);
// Update a MenuItem
exports.menuItemRouter.put("/update-menu-items/:id", auth_1.authenticateAdmin, menu_controller_1.updateMenuItem);
// Delete a MenuItem
exports.menuItemRouter.delete("/delete-menu-items/:id", auth_1.authenticateAdmin, menu_controller_1.deleteMenuItem);
