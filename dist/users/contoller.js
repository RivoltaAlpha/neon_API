"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.getOrders = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.listUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const services_1 = require("./services");
const listUsers = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, services_1.usersService)(limit);
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
//search user
const getUser = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const user = await (0, services_1.getUserById)(id);
        if (user === null) {
            return c.text("User not found", 404);
        }
        return c.json(user, 200);
    }
    catch (error) {
        console.error(error?.message);
    }
};
exports.getUser = getUser;
// create user
const createUser = async (c) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bcrypt_1.default.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await (0, services_1.createUserService)(user);
        if (!createdUser)
            return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createUser = createUser;
// updateUser
const updateUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await (0, services_1.getUserById)(id);
        if (searchedUser == undefined)
            return c.text("User not found", 404);
        // get the data and update it
        const res = await (0, services_1.updateUserService)(id, user);
        // return a success message
        if (!res)
            return c.text("User not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateUser = updateUser;
//delete user
const deleteUser = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await (0, services_1.getUserById)(id);
        if (user == undefined)
            return c.text("User not found", 404);
        //deleting the user
        const res = await (0, services_1.deleteUserService)(id);
        if (!res)
            return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteUser = deleteUser;
// Get user orders
const getOrders = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const orders = await (0, services_1.getUserOrders)(id);
        return c.json(orders, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: "Failed to fetch user orders" }, 500);
    }
};
exports.getOrders = getOrders;
// Get user Comments
const getComments = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const comments = await (0, services_1.getUserComments)(id);
        return c.json(comments, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: "Failed to fetch user orders" }, 500);
    }
};
exports.getComments = getComments;
