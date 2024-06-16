"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.getUserOwnedRestaurants = exports.getUserComments = exports.getUserOrders = exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserById = exports.usersService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
const usersService = async (limit) => {
    if (limit) {
        return await db_1.default.query.users.findMany({
            limit: limit,
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
    return await db_1.default.query.users.findMany({
        where: (fields, { eq }) => eq(fields.id, id),
        columns: {
            id: true,
            name: true,
        },
        with: {
            orders: {
                columns: {
                    id: true,
                    actual_delivery_time: true,
                    delivery_address_id: true,
                    driver_id: true,
                    final_price: true,
                },
            },
        },
    });
}
exports.getUserOrders = getUserOrders;
async function getUserComments(id) {
    return await db_1.default.query.users.findMany({
        where: (fields, { eq }) => eq(fields.id, id),
        columns: {
            id: true,
            name: true,
        },
        with: {
            comments: {
                columns: {
                    comment: true,
                },
            },
        },
    });
}
exports.getUserComments = getUserComments;
async function getUserOwnedRestaurants(id) {
    return await db_1.default.query.users.findMany({
        where: (fields, { eq }) => eq(fields.id, id),
        columns: {
            id: true,
            name: true,
        },
        with: {
            restaurant_owners: {
                columns: {
                    restaurant_id: true,
                },
                with: {
                    restaurant: {
                        columns: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
}
exports.getUserOwnedRestaurants = getUserOwnedRestaurants;
const getUserDetails = async (id) => {
    return await db_1.default.query.users.findMany({
        where: (fields, { eq }) => eq(fields.id, id),
        columns: {
            id: true,
            name: true,
            contact_phone: true,
            email: true,
        },
        with: {
            addresses: {
                columns: {
                    street_address_1: true,
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
                },
            },
            comments: {
                columns: {
                    comment: true,
                },
            },
            orders: {
                columns: {
                    restaurant_id: true,
                    // Add other order columns as needed
                },
            },
            restaurant_owners: {
                columns: {
                    restaurant_id: true,
                    // Add other restaurant_owner columns as needed
                },
            },
            drivers: {
                columns: {
                    id: true,
                    user_id: true,
                    online: true,
                    delivering: true,
                    // Add other driver columns as needed
                },
            },
        },
    });
};
exports.getUserDetails = getUserDetails;
