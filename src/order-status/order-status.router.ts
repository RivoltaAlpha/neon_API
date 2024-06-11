import { Hono } from "hono";
import { getOrderStatus, createOrderStatus, updateOrderStatus, deleteOrderStatus } from "./order-status.controller";
import { zValidator } from "@hono/zod-validator";
import { order_statusSchema } from "../validator";
import { authenticateUser, authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const orderStatusRouter = new Hono();

// Get a single OrderStatus
orderStatusRouter.get("/order_statuses/:id", authenticateBoth, getOrderStatus);

// Create a OrderStatus
orderStatusRouter.post("/order_statuses",
    zValidator("json", order_statusSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
   authenticateAdmin, createOrderStatus);

// Update a OrderStatus
orderStatusRouter.put("/order_statuses/:id",authenticateAdmin, updateOrderStatus);

// Delete a OrderStatus
orderStatusRouter.delete("/order_statuses/:id",authenticateAdmin, deleteOrderStatus);
