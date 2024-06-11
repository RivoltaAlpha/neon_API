import { Hono } from "hono";
import { getOrder, createOrder, updateOrder, deleteOrder } from "./orders.controller";
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validator";
import { authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const orderRouter = new Hono();
//list all
orderRouter.get('/orders', authenticateAdmin, getOrder);

// Get a single order by ID: api/orders/1
orderRouter.get("/orders/:id", authenticateBoth, getOrder);

// Create an order
orderRouter.post(
  "/orders",
  zValidator("json", orderSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateBoth, createOrder
);

// Update an order by ID
orderRouter.put("/orders/:id",authenticateBoth, updateOrder);

// Delete an order by ID
orderRouter.delete("/orders/:id",authenticateBoth, deleteOrder);

// orderRouter.get("/orders/search", searchOrders);
