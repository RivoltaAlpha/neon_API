"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwnerService = exports.updateRestaurantOwnerService = exports.createRestaurantOwnerService = exports.getRestaurantOwnerService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
async function getRestaurantOwnerService(id) {
    return db_1.db.select().from(schema_1.restaurant_owner).where((0, drizzle_orm_1.eq)(schema_1.restaurant_owner.owner_id, id));
}
exports.getRestaurantOwnerService = getRestaurantOwnerService;
;
const createRestaurantOwnerService = async (restaurantOwnerData) => {
    await db_1.db.insert(schema_1.restaurant_owner).values(restaurantOwnerData);
    return "Restaurant Owner relationship created successfully";
};
exports.createRestaurantOwnerService = createRestaurantOwnerService;
const updateRestaurantOwnerService = async (restaurant_id, owner_id, restaurantOwnerData) => {
    await db_1.db.update(schema_1.restaurant_owner)
        .set(restaurantOwnerData)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.restaurant_owner.restaurant_id, restaurant_id), (0, drizzle_orm_1.eq)(schema_1.restaurant_owner.owner_id, owner_id)));
    return "Restaurant Owner relationship updated successfully";
};
exports.updateRestaurantOwnerService = updateRestaurantOwnerService;
const deleteRestaurantOwnerService = async (restaurant_id, owner_id) => {
    await db_1.db.delete(schema_1.restaurant_owner)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.restaurant_owner.restaurant_id, restaurant_id), (0, drizzle_orm_1.eq)(schema_1.restaurant_owner.owner_id, owner_id)));
    return "Restaurant Owner relationship deleted successfully";
};
exports.deleteRestaurantOwnerService = deleteRestaurantOwnerService;
