"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenuItem = exports.createMenuItem = exports.getMenuItem = exports.listUsers = void 0;
const menu_service_1 = require("./menu-service");
//get all
const listUsers = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, menu_service_1.listService)(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listUsers = listUsers;
// Get MenuItem
const getMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const menuItem = await (0, menu_service_1.getMenuItemService)(id);
        if (menuItem === null) {
            return c.text("MenuItem not found", 404);
        }
        return c.json(menuItem, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getMenuItem = getMenuItem;
// Create MenuItem
const createMenuItem = async (c) => {
    try {
        const menuItemData = await c.req.json();
        const createdMenuItem = await (0, menu_service_1.createMenuItemService)(menuItemData);
        return c.json({ msg: createdMenuItem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createMenuItem = createMenuItem;
// Update MenuItem
const updateMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const menuItemData = await c.req.json();
        const updatedMenuItem = await (0, menu_service_1.updateMenuItemService)(id, menuItemData);
        return c.json({ msg: updatedMenuItem }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateMenuItem = updateMenuItem;
// Delete MenuItem
const deleteMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const deletedMenuItem = await (0, menu_service_1.deleteMenuItemService)(id);
        return c.json({ msg: deletedMenuItem }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteMenuItem = deleteMenuItem;
