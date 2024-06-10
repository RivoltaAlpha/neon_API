"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemService = exports.updateMenuItemService = exports.createMenuItemService = exports.getMenuItemService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
async function getMenuItemService(id) {
    return db_1.default.select().from(schema_1.menu_item).where((0, drizzle_orm_1.eq)(schema_1.menu_item.id, id));
}
exports.getMenuItemService = getMenuItemService;
;
const createMenuItemService = async (menuItemData) => {
    await db_1.default.insert(schema_1.menu_item).values(menuItemData);
    return "MenuItem created successfully";
};
exports.createMenuItemService = createMenuItemService;
const updateMenuItemService = async (id, menuItemData) => {
    await db_1.default.update(schema_1.menu_item).set(menuItemData).where((0, drizzle_orm_1.eq)(schema_1.menu_item.id, id));
    return "MenuItem updated successfully";
};
exports.updateMenuItemService = updateMenuItemService;
const deleteMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.menu_item).where((0, drizzle_orm_1.eq)(schema_1.menu_item.id, id));
    return "MenuItem deleted successfully";
};
exports.deleteMenuItemService = deleteMenuItemService;
