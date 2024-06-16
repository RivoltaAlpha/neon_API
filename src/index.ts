import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import { trimTrailingSlash } from "hono/trailing-slash";
import { timeout } from "hono/timeout";
import { HTTPException } from "hono/http-exception";
import { prometheus } from "@hono/prometheus";
import {readFile} from "fs/promises";
import path from "path";

import { authRouter } from "./auth/auth.router";
import { userRouter } from "./users/routers";
import { restaurantRouter } from "./restaurants/restaurant.router";
import { stateRouter } from "./state/state.routers";
import { cityRouter } from "./city/city.router";
import { orderRouter } from "./orders/orders.router";
import { orderMenuItemRouter } from "./order-menu-item/order-menu.router";
import { orderStatusRouter } from "./order-status/order-status.router";
import { addressRouter } from "./address/address.router";
import { driverRouter } from "./driver/driver.router";
import { menuItemRouter } from "./menu-item/menu-router";
import { statusRouter } from "./status-catalog/status-routes";
import { commentRouter } from "./comments/comments-routers";
import { categoryRouter } from "./category/category.routers";
import { ownersRouter } from "./restaurant-owners/owners.routers";

const app = new Hono().basePath("/api");
const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  });
const { printMetrics, registerMetrics } = prometheus();

// inbuilt middlewares
app.use(logger()); //logs request and response to the console
app.use(csrf()); //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()); //removes trailing slashes from the request URL
app.use("/", timeout(10000, customTimeoutException));
//3rd party middlewares
app.use("*", registerMetrics);

//default routes
app.get('/', async (c) => {
  try {
      let html = await readFile('./index.html', 'utf-8');
      return c.html(html);
  } catch (err:any) {
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
app.route("/auth", authRouter);
app.route("/", userRouter);
app.route("/", restaurantRouter);
app.route("/", stateRouter);
app.route("/", cityRouter);
app.route("/", orderRouter);
app.route("/", orderMenuItemRouter);
app.route("/", orderStatusRouter);
app.route("/", addressRouter);
app.route("/", driverRouter);
app.route("/", menuItemRouter);
app.route("/", statusRouter);
app.route("/", commentRouter);
app.route("/", categoryRouter);
app.route("/", ownersRouter);

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


serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});
console.log(`Server is running on port ${process.env.PORT}`);
