"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItemService = exports.updateOrderMenuItemService = exports.createOrderMenuItemService = exports.getOrderMenuItemService = exports.listService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const listService = async (limit) => {
    if (limit) {
        return await db_1.default.query.order_menu_item.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.order_menu_item.findMany();
};
exports.listService = listService;
async function getOrderMenuItemService(id) {
    return db_1.default.select().from(schema_1.order_menu_item).where((0, drizzle_orm_1.eq)(schema_1.order_menu_item.id, id));
}
exports.getOrderMenuItemService = getOrderMenuItemService;
;
const createOrderMenuItemService = async (orderMenuItem) => {
    await db_1.default.insert(schema_1.order_menu_item).values(orderMenuItem);
    return "OrderMenuItem created successfully";
};
exports.createOrderMenuItemService = createOrderMenuItemService;
const updateOrderMenuItemService = async (id, orderMenuItem) => {
    await db_1.default.update(schema_1.order_menu_item).set(orderMenuItem).where((0, drizzle_orm_1.eq)(schema_1.order_menu_item.id, id));
    return "OrderMenuItem updated successfully";
};
exports.updateOrderMenuItemService = updateOrderMenuItemService;
const deleteOrderMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.order_menu_item).where((0, drizzle_orm_1.eq)(schema_1.order_menu_item.id, id));
    return "OrderMenuItem deleted successfully";
};
exports.deleteOrderMenuItemService = deleteOrderMenuItemService;
