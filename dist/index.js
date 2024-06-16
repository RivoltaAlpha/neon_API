"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const trailing_slash_1 = require("hono/trailing-slash");
const timeout_1 = require("hono/timeout");
const http_exception_1 = require("hono/http-exception");
const prometheus_1 = require("@hono/prometheus");
const promises_1 = require("fs/promises");
const auth_router_1 = require("./auth/auth.router");
const routers_1 = require("./users/routers");
const restaurant_router_1 = require("./restaurants/restaurant.router");
const state_routers_1 = require("./state/state.routers");
const city_router_1 = require("./city/city.router");
const orders_router_1 = require("./orders/orders.router");
const order_menu_router_1 = require("./order-menu-item/order-menu.router");
const order_status_router_1 = require("./order-status/order-status.router");
const address_router_1 = require("./address/address.router");
const driver_router_1 = require("./driver/driver.router");
const menu_router_1 = require("./menu-item/menu-router");
const status_routes_1 = require("./status-catalog/status-routes");
const comments_routers_1 = require("./comments/comments-routers");
const category_routers_1 = require("./category/category.routers");
const owners_routers_1 = require("./restaurant-owners/owners.routers");
const app = new hono_1.Hono().basePath("/api");
const customTimeoutException = () => new http_exception_1.HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
});
const { printMetrics, registerMetrics } = (0, prometheus_1.prometheus)();
// inbuilt middlewares
app.use((0, logger_1.logger)()); //logs request and response to the console
app.use((0, csrf_1.csrf)()); //prevents CSRF attacks by checking request headers.
app.use((0, trailing_slash_1.trimTrailingSlash)()); //removes trailing slashes from the request URL
app.use("/", (0, timeout_1.timeout)(10000, customTimeoutException));
//3rd party middlewares
app.use("*", registerMetrics);
//default routes
app.get('/', async (c) => {
    try {
        let html = await (0, promises_1.readFile)('./index.html', 'utf-8');
        return c.html(html);
    }
    catch (err) {
        return c.text(err.message, 500);
    }
});
app.notFound((c) => {
    return c.text("Route Not Found", 404);
});
app.get("/timeout", async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000));
    return c.text("data after 5 seconds", 200);
});
app.get("/metrics", printMetrics);
// custom routes
app.route("/auth", auth_router_1.authRouter);
app.route("/", routers_1.userRouter);
app.route("/", restaurant_router_1.restaurantRouter);
app.route("/", state_routers_1.stateRouter);
app.route("/", city_router_1.cityRouter);
app.route("/", orders_router_1.orderRouter);
app.route("/", order_menu_router_1.orderMenuItemRouter);
app.route("/", order_status_router_1.orderStatusRouter);
app.route("/", address_router_1.addressRouter);
app.route("/", driver_router_1.driverRouter);
app.route("/", menu_router_1.menuItemRouter);
app.route("/", status_routes_1.statusRouter);
app.route("/", comments_routers_1.commentRouter);
app.route("/", category_routers_1.categoryRouter);
app.route("/", owners_routers_1.ownersRouter);
// // src/index.ts
// import { sendWelcomeEmail } from './emailing/email';
// // Simulate a user registration event
// const onUserRegistered = async (email: string) => {
//   const subject = 'Welcome to Our Service!';
//   const text = 'Thank you for registering with our service. We are excited to have you on board!';
//   await sendWelcomeEmail(email, subject, text);
// };
// // Simulate a new user registration
// const newUserEmail = 'mwanikitiffany25@gmail.com';
// onUserRegistered(newUserEmail).then(() => {
//   console.log('User registration email sent successfully.');
// }).catch(error => {
//   console.error('Failed to send registration email: ', error);
// });
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
});
console.log(`Server is running on port ${process.env.PORT}`);
