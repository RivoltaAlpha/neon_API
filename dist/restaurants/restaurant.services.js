"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantDetailsService = exports.deleteRestaurantService = exports.updateRestaurantService = exports.createRestaurantService = exports.getRestaurantService = exports.restaurantService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const restaurantService = async (limit) => {
    if (limit) {
        return await db_1.default.query.restaurant.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.restaurant.findMany();
};
exports.restaurantService = restaurantService;
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
// additional functionalities
const getRestaurantDetailsService = async (id) => {
    return await db_1.default.query.restaurant.findMany({
        where: (fields, { eq }) => eq(fields.id, id),
        columns: {
            id: true,
            name: true,
            street_address: true,
        },
        with: {
            city: {
                columns: {
                    name: true,
                },
                with: {
                    state: {
                        columns: {
                            name: true,
                        },
                    },
                },
            },
            owners: {
                columns: {
                    owner_id: true,
                },
                with: {
                    owner: {
                        columns: {
                            name: true,
                        },
                    },
                },
            },
            menu_items: {
                columns: {
                    id: true,
                    name: true,
                    price: true,
                },
            },
            orders: {
                columns: {
                    id: true,
                    price: true,
                    final_price: true,
                }
            },
        },
    });
};
exports.getRestaurantDetailsService = getRestaurantDetailsService;
