import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import { trimTrailingSlash } from "hono/trailing-slash";
import { timeout } from "hono/timeout";
import { HTTPException } from "hono/http-exception";
import { prometheus } from "@hono/prometheus";

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

// Default routes
app.get("/welcome", (c) => {
  const welcomeMessage = `
    <html>
      <head>
        <title>Welcome to Our API</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: aqua; text-align: center; padding: 50px; }
          h1 { color: black; }
          p { color: #666; }
          .emoji { font-size: 2em; }
        </style>
      </head>
      <body>
        <div class="emoji">😏😏😌😌😌😲</div>
        <h1>Welcome to Our API Tiffany 😎</h1>
        <p>Your API is running smoothly!</p>
        <p>Explore the available endpoints and enjoy the features.</p>
      </body>
    </html>
  `;
  return c.html(welcomeMessage);
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

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});
console.log(`Server is running on port ${process.env.PORT}`);
