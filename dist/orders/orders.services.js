"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetails = exports.getOrderUser = exports.getOrderAddress = exports.getOrderDriver = exports.getOrderComments = exports.deleteOrderService = exports.updateOrderService = exports.createOrderService = exports.getOrderService = exports.listService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const listService = async (limit) => {
    if (limit) {
        return await db_1.default.query.orders.findMany({
            limit: limit,
        });
    }
    return await db_1.default.query.orders.findMany();
};
exports.listService = listService;
async function getOrderService(id) {
    return db_1.default.select().from(schema_1.orders).where((0, drizzle_orm_1.eq)(schema_1.orders.id, id));
}
exports.getOrderService = getOrderService;
const createOrderService = async (orderData) => {
    await db_1.default.insert(schema_1.orders).values(orderData);
    return "Order created successfully";
};
exports.createOrderService = createOrderService;
const updateOrderService = async (id, orderData) => {
    await db_1.default.update(schema_1.orders).set(orderData).where((0, drizzle_orm_1.eq)(schema_1.orders.id, id));
    return "Order updated successfully";
};
exports.updateOrderService = updateOrderService;
const deleteOrderService = async (id) => {
    await db_1.default.delete(schema_1.orders).where((0, drizzle_orm_1.eq)(schema_1.orders.id, id));
    return "Order deleted successfully";
};
exports.deleteOrderService = deleteOrderService;
// Additional services to get related data
const getOrderComments = async (orderId) => {
    return await db_1.default.query.orders.findMany({
        where: (fields, { eq }) => eq(fields.id, orderId),
        columns: {
            id: true,
        },
        with: {
            comments: {
                columns: {
                    comment: true,
                    is_complaint: true,
                },
            },
        },
    });
};
exports.getOrderComments = getOrderComments;
const getOrderDriver = async (orderId) => {
    return await db_1.default.query.orders.findMany({
        where: (fields, { eq }) => eq(fields.id, orderId),
        columns: {
            id: true,
        },
        with: {
            driver: {
                columns: {
                    id: true,
                    user_id: true,
                    online: true,
                    delivering: true,
                },
            },
        },
    });
};
exports.getOrderDriver = getOrderDriver;
const getOrderAddress = async (orderId) => {
    return await db_1.default.query.orders.findMany({
        where: (fields, { eq }) => eq(fields.id, orderId),
        columns: {
            id: true,
        },
        with: {
            delivery_address: {
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
        },
    });
};
exports.getOrderAddress = getOrderAddress;
const getOrderUser = async (orderId) => {
    return await db_1.default.query.orders.findMany({
        where: (fields, { eq }) => eq(fields.id, orderId),
        columns: {
            id: true,
        },
        with: {
            user: {
                columns: {
                    name: true,
                    contact_phone: true,
                    email: true,
                },
            },
        },
    });
};
exports.getOrderUser = getOrderUser;
const getOrderDetails = async (id) => {
    return await db_1.default.query.orders.findMany({
        where: (fields, { eq }) => eq(fields.id, id),
        columns: {
            id: true,
            actual_delivery_time: true,
            delivery_address_id: true,
            driver_id: true,
            final_price: true,
        },
        with: {
            restaurant: {
                columns: {
                    name: true,
                    street_address: true,
                },
            },
            delivery_address: {
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
            user: {
                columns: {
                    name: true,
                    contact_phone: true,
                    email: true,
                },
            },
            driver: {
                columns: {
                    id: true,
                    user_id: true,
                    online: true,
                    delivering: true,
                },
            },
            comments: {
                columns: {
                    comment: true,
                    is_complaint: true,
                },
            },
        },
    });
};
exports.getOrderDetails = getOrderDetails;
