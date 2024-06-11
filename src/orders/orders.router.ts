import { Hono } from "hono";
import { getOrder, createOrder, updateOrder, deleteOrder } from "./orders.controller";
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validator";
import { authenticateUser, authenticateAdmin } from "../middleware/auth";

export const orderRouter = new Hono();

orderRouter.use('*', authenticateAdmin)

// Get a single order by ID: api/orders/1
orderRouter.get("/orders/:id", authenticateUser, getOrder);

// Create an order
orderRouter.post(
  "/orders",
  zValidator("json", orderSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateUser, createOrder
);

// Update an order by ID
orderRouter.put("/orders/:id", updateOrder);

// Delete an order by ID
orderRouter.delete("/orders/:id", deleteOrder);

// orderRouter.get("/orders/search", searchOrders);
