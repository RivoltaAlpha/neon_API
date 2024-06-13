import { Hono } from "hono";
import { getOrderStatus, createOrderStatus, updateOrderStatus, deleteOrderStatus,listOrderStatus } from "./order-status.controller";
import { zValidator } from "@hono/zod-validator";
import { order_statusSchema } from "../validator";
import { authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const orderStatusRouter = new Hono();
//list  all
orderStatusRouter.get('/list-order-statuses', authenticateBoth, listOrderStatus);

// Get a single OrderStatus
orderStatusRouter.get("/order-statuses/:id", authenticateAdmin, getOrderStatus);

// Create a OrderStatus
orderStatusRouter.post("/create-order_statuses",
    zValidator("json", order_statusSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
   authenticateAdmin, createOrderStatus);

// Update a OrderStatus
orderStatusRouter.put("/update-order-statuses/:id",authenticateAdmin, updateOrderStatus);

// Delete a OrderStatus
orderStatusRouter.delete("/delete-order-statuses/:id",authenticateAdmin, deleteOrderStatus);
