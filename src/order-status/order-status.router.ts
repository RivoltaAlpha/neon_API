import { Hono } from "hono";
import { getOrderStatus, createOrderStatus, updateOrderStatus, deleteOrderStatus } from "./order-status.controller";
import { zValidator } from "@hono/zod-validator";
import { order_statusSchema } from "../validator";
import { authenticateUser, authenticateAdmin } from "../middleware/auth";

export const orderStatusRouter = new Hono();

orderStatusRouter.use('*', authenticateAdmin);

// Get a single OrderStatus
orderStatusRouter.get("/order_statuses/:id", authenticateUser, getOrderStatus);

// Create a OrderStatus
orderStatusRouter.post("/order_statuses",
    zValidator("json", order_statusSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
    createOrderStatus);

// Update a OrderStatus
orderStatusRouter.put("/order_statuses/:id", updateOrderStatus);

// Delete a OrderStatus
orderStatusRouter.delete("/order_statuses/:id", deleteOrderStatus);
