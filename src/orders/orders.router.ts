import { Hono } from "hono";
import { getOrder, createOrder, updateOrder, deleteOrder,OrderAddress,OrderComments,OrderDriver,OrderUsers,listOtherOrderDetails } from "./orders.controller";
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

// Get comments for an order
orderRouter.get('/orders/:id/comments', authenticateBoth, OrderComments);

// Get driver for an order
orderRouter.get('/orders/:id/driver', authenticateBoth, OrderDriver);

// Get address for an order
orderRouter.get('/orders/:id/address', authenticateBoth, OrderAddress);

// Get statuses for an order
orderRouter.get('/orders/:id/deets', authenticateBoth, listOtherOrderDetails);

// Get user for an order
orderRouter.get('/orders/:id/user', authenticateBoth, OrderUsers);
