import { Hono } from "hono";
import { getOrder, createOrder, updateOrder, deleteOrder,searchOrders } from "./orders.controller";
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validator";

export const orderRouter = new Hono();

// Get a single order by ID: api/orders/1
orderRouter.get("/orders/:id", getOrder);

// Create an order
orderRouter.post(
  "/orders",
  zValidator("json", orderSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  createOrder
);

// Update an order by ID
orderRouter.put("/orders/:id", updateOrder);

// Delete an order by ID
orderRouter.delete("/orders/:id", deleteOrder);

orderRouter.get("/orders/search", searchOrders);
