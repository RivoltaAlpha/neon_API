"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantService = exports.updateRestaurantService = exports.createRestaurantService = exports.getRestaurantService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// Get a single restaurant by ID
async function getRestaurantService(id) {
    return db_1.default.select().from(schema_1.restaurant).where((0, drizzle_orm_1.eq)(schema_1.restaurant.id, id));
}
exports.getRestaurantService = getRestaurantService;
;
// Create a new restaurant
const createRestaurantService = async (restaurantData) => {
    await db_1.default.insert(schema_1.restaurant).values(restaurantData);
    return "Restaurant created successfully";
};
exports.createRestaurantService = createRestaurantService;
// Update an existing restaurant by ID
const updateRestaurantService = async (id, restaurantData) => {
    await db_1.default.update(schema_1.restaurant).set(restaurantData).where((0, drizzle_orm_1.eq)(schema_1.restaurant.id, id));
    return "Restaurant updated successfully";
};
exports.updateRestaurantService = updateRestaurantService;
// Delete a restaurant by ID
const deleteRestaurantService = async (id) => {
    await db_1.default.delete(schema_1.restaurant).where((0, drizzle_orm_1.eq)(schema_1.restaurant.id, id));
    return "Restaurant deleted successfully";
};
exports.deleteRestaurantService = deleteRestaurantService;
