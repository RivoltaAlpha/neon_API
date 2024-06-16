"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateRelations = exports.state = exports.cityRelations = exports.city = exports.addressRelations = exports.address = exports.commentRelations = exports.comment = exports.authUserRelations = exports.authUser = exports.roleEnum = exports.usersRelations = exports.users = exports.driverRelations = exports.driver = exports.statusCatalogRelations = exports.status_catalog = exports.orderStatusRelations = exports.order_status = exports.orderMenuItemRelations = exports.order_menu_item = exports.ordersRelations = exports.orders = exports.categoryRelations = exports.category = exports.menuItemRelations = exports.menu_item = exports.restaurantOwnerRelations = exports.restaurant_owner = exports.restaurantRelations = exports.restaurant = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Restaurant table
exports.restaurant = (0, pg_core_1.pgTable)('restaurant', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    street_address: (0, pg_core_1.text)('street_address').notNull(),
    zip_code: (0, pg_core_1.text)('zip_code').notNull(),
    city_id: (0, pg_core_1.integer)('city_id').notNull().references(() => exports.city.id, { onDelete: "cascade" }),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.restaurantRelations = (0, drizzle_orm_1.relations)(exports.restaurant, ({ one, many }) => ({
    city: one(exports.city, {
        fields: [exports.restaurant.city_id],
        references: [exports.city.id],
    }),
    owners: many(exports.restaurant_owner),
    menu_items: many(exports.menu_item),
    orders: many(exports.orders),
}));
// RestaurantOwner table
exports.restaurant_owner = (0, pg_core_1.pgTable)('restaurant_owner', {
    restaurant_id: (0, pg_core_1.integer)('restaurant_id').notNull().references(() => exports.restaurant.id, { onDelete: 'cascade' }),
    owner_id: (0, pg_core_1.integer)('owner_id').notNull().references(() => exports.users.id, { onDelete: 'cascade' }),
}, table => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [table.restaurant_id, table.owner_id] })
}));
exports.restaurantOwnerRelations = (0, drizzle_orm_1.relations)(exports.restaurant_owner, ({ one }) => ({
    restaurant: one(exports.restaurant, {
        fields: [exports.restaurant_owner.restaurant_id],
        references: [exports.restaurant.id],
    }),
    owner: one(exports.users, {
        fields: [exports.restaurant_owner.owner_id],
        references: [exports.users.id],
    }),
}));
// MenuItem table
exports.menu_item = (0, pg_core_1.pgTable)('menu_item', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    restaurant_id: (0, pg_core_1.integer)('restaurant_id').notNull().references(() => exports.restaurant.id, { onDelete: "cascade" }),
    category_id: (0, pg_core_1.integer)('category_id').notNull().references(() => exports.category.id, { onDelete: "cascade" }),
    description: (0, pg_core_1.text)('description').notNull(),
    ingredients: (0, pg_core_1.text)('ingredients').notNull(),
    price: (0, pg_core_1.numeric)('price', { precision: 10, scale: 2 }).notNull(),
    active: (0, pg_core_1.boolean)('active').notNull(),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.menuItemRelations = (0, drizzle_orm_1.relations)(exports.menu_item, ({ one, many }) => ({
    restaurant: one(exports.restaurant, {
        fields: [exports.menu_item.restaurant_id],
        references: [exports.restaurant.id],
    }),
    category: one(exports.category, {
        fields: [exports.menu_item.category_id],
        references: [exports.category.id],
    }),
    order_menu_items: many(exports.order_menu_item),
}));
// Category table
exports.category = (0, pg_core_1.pgTable)('category', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
});
exports.categoryRelations = (0, drizzle_orm_1.relations)(exports.category, ({ many }) => ({
    menu_items: many(exports.menu_item),
}));
// orders Table
exports.orders = (0, pg_core_1.pgTable)('orders', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    restaurant_id: (0, pg_core_1.integer)('restaurant_id').notNull().references(() => exports.restaurant.id, { onDelete: "cascade" }),
    estimated_delivery_time: (0, pg_core_1.timestamp)('estimated_delivery_time').defaultNow().notNull(),
    actual_delivery_time: (0, pg_core_1.timestamp)('actual_delivery_time').defaultNow(),
    delivery_address_id: (0, pg_core_1.integer)('delivery_address_id').notNull(),
    user_id: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id, { onDelete: "cascade" }),
    driver_id: (0, pg_core_1.integer)('driver_id').notNull().references(() => exports.driver.id, { onDelete: "cascade" }),
    price: (0, pg_core_1.numeric)('price', { precision: 10, scale: 2 }).notNull(),
    discount: (0, pg_core_1.numeric)('discount', { precision: 10, scale: 2 }).notNull(),
    final_price: (0, pg_core_1.numeric)('final_price', { precision: 10, scale: 2 }).notNull(),
    comment: (0, pg_core_1.text)('comment'),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.ordersRelations = (0, drizzle_orm_1.relations)(exports.orders, ({ one, many }) => ({
    restaurant: one(exports.restaurant, {
        fields: [exports.orders.restaurant_id],
        references: [exports.restaurant.id],
    }),
    delivery_address: one(exports.address, {
        fields: [exports.orders.delivery_address_id],
        references: [exports.address.id],
    }),
    user: one(exports.users, {
        fields: [exports.orders.user_id],
        references: [exports.users.id],
    }),
    driver: one(exports.driver, {
        fields: [exports.orders.driver_id],
        references: [exports.driver.id],
    }),
    order_menu_items: many(exports.order_menu_item),
    order_statuses: many(exports.order_status),
    comments: many(exports.comment),
}));
// OrderMenuItem table
exports.order_menu_item = (0, pg_core_1.pgTable)('order_menu_item', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    order_id: (0, pg_core_1.integer)('order_id').notNull().references(() => exports.orders.id, { onDelete: "cascade" }),
    menu_item_id: (0, pg_core_1.integer)('menu_item_id').notNull().references(() => exports.menu_item.id, { onDelete: "cascade" }),
    quantity: (0, pg_core_1.integer)('quantity').notNull(),
    item_price: (0, pg_core_1.numeric)('item_price', { precision: 10, scale: 2 }).notNull(),
    price: (0, pg_core_1.numeric)('price', { precision: 10, scale: 2 }).notNull(),
    comment: (0, pg_core_1.text)('comment'),
});
exports.orderMenuItemRelations = (0, drizzle_orm_1.relations)(exports.order_menu_item, ({ one }) => ({
    order: one(exports.orders, {
        fields: [exports.order_menu_item.order_id],
        references: [exports.orders.id],
    }),
    menu_item: one(exports.menu_item, {
        fields: [exports.order_menu_item.menu_item_id],
        references: [exports.menu_item.id],
    }),
}));
// OrderStatus table
exports.order_status = (0, pg_core_1.pgTable)('order_status', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    order_id: (0, pg_core_1.integer)('order_id').notNull().references(() => exports.orders.id, { onDelete: "cascade" }),
    status_catalog_id: (0, pg_core_1.integer)('status_catalog_id').notNull().references(() => exports.status_catalog.id, { onDelete: "cascade" }),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
exports.orderStatusRelations = (0, drizzle_orm_1.relations)(exports.order_status, ({ one }) => ({
    order: one(exports.orders, {
        fields: [exports.order_status.order_id],
        references: [exports.orders.id],
    }),
    status_catalog: one(exports.status_catalog, {
        fields: [exports.order_status.status_catalog_id],
        references: [exports.status_catalog.id],
    }),
}));
// StatusCatalog table
exports.status_catalog = (0, pg_core_1.pgTable)('status_catalog', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name'),
});
exports.statusCatalogRelations = (0, drizzle_orm_1.relations)(exports.status_catalog, ({ many }) => ({
    order_statuses: many(exports.order_status),
}));
// Driver table
exports.driver = (0, pg_core_1.pgTable)('driver', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    car_make: (0, pg_core_1.text)('car_make').notNull(),
    car_model: (0, pg_core_1.text)('car_model').notNull(),
    car_year: (0, pg_core_1.integer)('car_year').notNull(),
    user_id: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id, { onDelete: "cascade" }),
    online: (0, pg_core_1.boolean)('online').notNull(),
    delivering: (0, pg_core_1.boolean)('delivering').notNull(),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.driverRelations = (0, drizzle_orm_1.relations)(exports.driver, ({ many, one }) => ({
    user: one(exports.users, {
        fields: [exports.driver.user_id],
        references: [exports.users.id],
    }),
    orders: many(exports.orders),
}));
// Users table
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    contact_phone: (0, pg_core_1.text)('contact_phone').notNull(),
    phone_verified: (0, pg_core_1.boolean)('phone_verified').notNull(),
    email: (0, pg_core_1.text)('email').notNull(),
    email_verified: (0, pg_core_1.boolean)('email_verified').notNull(),
    confirmation_code: (0, pg_core_1.text)('confirmation_code').notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    addresses: many(exports.address),
    comments: many(exports.comment),
    orders: many(exports.orders),
    restaurant_owners: many(exports.restaurant_owner),
    drivers: many(exports.driver),
}));
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user", "both", "driver", "restaurant_owner"]);
// The auth_user table schema
exports.authUser = (0, pg_core_1.pgTable)('auth_user', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.users.id, { onDelete: "cascade" }),
    password: (0, pg_core_1.varchar)("password", { length: 100 }),
    username: (0, pg_core_1.varchar)("username", { length: 100 }),
    role: (0, exports.roleEnum)("role").default("user")
});
// auth relations
exports.authUserRelations = (0, drizzle_orm_1.relations)(exports.authUser, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.authUser.userId],
        references: [exports.users.id],
    })
}));
// Comment table
exports.comment = (0, pg_core_1.pgTable)('comment', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    user_id: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id, { onDelete: "cascade" }),
    order_id: (0, pg_core_1.integer)('order_id').notNull().references(() => exports.orders.id, { onDelete: "cascade" }),
    comment: (0, pg_core_1.text)('comment').notNull(),
    is_complaint: (0, pg_core_1.boolean)('is_complaint').notNull(),
    is_praise: (0, pg_core_1.boolean)('is_praise').notNull(),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.commentRelations = (0, drizzle_orm_1.relations)(exports.comment, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.comment.user_id],
        references: [exports.users.id],
    }),
    order: one(exports.orders, {
        fields: [exports.comment.order_id],
        references: [exports.orders.id],
    }),
}));
// Address table
exports.address = (0, pg_core_1.pgTable)('address', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    street_address_1: (0, pg_core_1.text)('street_address_1').notNull(),
    street_address_2: (0, pg_core_1.text)('street_address_2'),
    zip_code: (0, pg_core_1.text)('zip_code').notNull(),
    delivery_instructions: (0, pg_core_1.text)('delivery_instructions'),
    user_id: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id, { onDelete: "cascade" }),
    city_id: (0, pg_core_1.integer)('city_id').notNull().references(() => exports.city.id, { onDelete: "cascade" }),
    created_at: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
/// 
exports.addressRelations = (0, drizzle_orm_1.relations)(exports.address, ({ many, one }) => ({
    user: one(exports.users, {
        fields: [exports.address.user_id],
        references: [exports.users.id],
    }),
    city: one(exports.city, {
        fields: [exports.address.city_id],
        references: [exports.city.id],
    }),
    orders: many(exports.orders),
}));
// City table
exports.city = (0, pg_core_1.pgTable)('city', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    state_id: (0, pg_core_1.integer)('state_id').notNull().references(() => exports.state.id, { onDelete: "cascade" }),
});
exports.cityRelations = (0, drizzle_orm_1.relations)(exports.city, ({ many, one }) => ({
    addresses: many(exports.address),
    state: one(exports.state, {
        fields: [exports.city.state_id],
        references: [exports.state.id],
    }),
    restaurants: many(exports.restaurant),
}));
// State table
exports.state = (0, pg_core_1.pgTable)('state', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    code: (0, pg_core_1.text)('code').notNull(),
});
exports.stateRelations = (0, drizzle_orm_1.relations)(exports.state, ({ many }) => ({
    cities: many(exports.city),
}));
