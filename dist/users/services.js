"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOwnedRestaurants = exports.getUserComments = exports.getUserOrders = exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserById = exports.usersService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
const usersService = async (limit) => {
    if (limit) {
        return await db_1.default.query.users.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.users.findMany();
};
exports.usersService = usersService;
async function getUserById(id) {
    return db_1.default.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
}
exports.getUserById = getUserById;
async function createUserService(data) {
    await db_1.default.insert(schema_1.users).values(data);
    return "User created successfully";
}
exports.createUserService = createUserService;
async function updateUserService(id, user) {
    await db_1.default.update(schema_1.users).set(user).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
    return "User updated successfully";
}
exports.updateUserService = updateUserService;
async function deleteUserService(id) {
    await db_1.default.delete(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
    return "User deleted successfully";
}
exports.deleteUserService = deleteUserService;
async function getUserOrders(id) {
    return db_1.default.select().from(schema_1.orders).where((0, drizzle_orm_1.eq)(schema_1.orders.user_id, id));
}
exports.getUserOrders = getUserOrders;
async function getUserComments(id) {
    return db_1.default.select().from(schema_1.comment).where((0, drizzle_orm_1.eq)(schema_1.comment.user_id, id));
}
exports.getUserComments = getUserComments;
async function getUserOwnedRestaurants(id) {
    return db_1.default.select().from(schema_1.restaurant_owner).where((0, drizzle_orm_1.eq)(schema_1.restaurant_owner.owner_id, id));
}
exports.getUserOwnedRestaurants = getUserOwnedRestaurants;
