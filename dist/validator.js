"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserShema = exports.loginUserShema = exports.addressSchema = exports.commentSchema = exports.status_catalogSchema = exports.categorySchema = exports.driverSchema = exports.order_statusSchema = exports.order_menu_itemSchema = exports.menu_itemSchema = exports.orderSchema = exports.stateSchema = exports.citySchema = exports.ownersSchema = exports.restaurantSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    phone_verified: zod_1.z.boolean(),
    email: zod_1.z.string().email(),
    email_verified: zod_1.z.boolean(),
    confirmation_code: zod_1.z.string(),
});
exports.restaurantSchema = zod_1.z.object({
    name: zod_1.z.string(),
    street_address: zod_1.z.string(),
    zip_code: zod_1.z.string(),
    city_id: zod_1.z.number(),
});
exports.ownersSchema = zod_1.z.object({
    restaurant_id: zod_1.z.number(),
    owner_id: zod_1.z.number(),
});
exports.citySchema = zod_1.z.object({
    name: zod_1.z.string(),
    state_id: zod_1.z.number(),
});
exports.stateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    code: zod_1.z.string(),
});
exports.orderSchema = zod_1.z.object({
    restaurant_id: zod_1.z.number(),
    estimated_delivery_time: zod_1.z.string().datetime(),
    actual_delivery_time: zod_1.z.string().datetime(),
    delivery_address_id: zod_1.z.number(),
    user_id: zod_1.z.number().int(),
    driver_id: zod_1.z.number(),
    price: zod_1.z.number(),
    discount: zod_1.z.number(),
    final_price: zod_1.z.number(),
    comment: zod_1.z.string(),
});
exports.menu_itemSchema = zod_1.z.object({
    name: zod_1.z.string(),
    restaurant_id: zod_1.z.number(),
    category_id: zod_1.z.number(),
    description: zod_1.z.string(),
    ingredients: zod_1.z.string(),
    price: zod_1.z.number(),
    active: zod_1.z.boolean(),
});
exports.order_menu_itemSchema = zod_1.z.object({
    orer_id: zod_1.z.number(),
    menu_item_id: zod_1.z.number(),
    quantity: zod_1.z.number(),
    item_price: zod_1.z.number(),
    price: zod_1.z.number(),
    comment: zod_1.z.string(),
});
exports.order_statusSchema = zod_1.z.object({
    order_id: zod_1.z.number(),
    status_catalog_id: zod_1.z.number(),
});
exports.driverSchema = zod_1.z.object({
    car_make: zod_1.z.string(),
    car_model: zod_1.z.string(),
    car_year: zod_1.z.string(),
    user_id: zod_1.z.number(),
    online: zod_1.z.boolean(),
    delivering: zod_1.z.boolean(),
});
exports.categorySchema = zod_1.z.object({
    name: zod_1.z.string(),
});
exports.status_catalogSchema = zod_1.z.object({
    name: zod_1.z.string(),
});
exports.commentSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    order_id: zod_1.z.number(),
    comment: zod_1.z.string(),
    is_complaint: zod_1.z.boolean(),
    is_praise: zod_1.z.boolean(),
});
exports.addressSchema = zod_1.z.object({
    street_address_1: zod_1.z.string(),
    street_address_2: zod_1.z.string(),
    zip_code: zod_1.z.string(),
    delivery_instructions: zod_1.z.string(),
    user_id: zod_1.z.number(),
    city_id: zod_1.z.number(),
});
exports.loginUserShema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.registerUserShema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    password: zod_1.z.string(),
    confirmation_code: zod_1.z.string(),
    role: zod_1.z.string().optional(),
});
