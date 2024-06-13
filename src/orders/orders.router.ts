import { Hono } from "hono";
import { listOrders,getOrder, createOrder, updateOrder, deleteOrder,OrderAddress,OrderComments,OrderDriver,OrderUsers,listOtherOrderDetails } from "./orders.controller";
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validator";
import { authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const orderRouter = new Hono();
//list all
orderRouter.get('/orders', authenticateAdmin, listOrders);

// Get a single order by ID: api/orders/1
orderRouter.get("/order/:id", authenticateBoth, getOrder);

// Create an order
orderRouter.post(
  "/create-orders",
  zValidator("json", orderSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateBoth, createOrder
);

// Update an order by ID
orderRouter.put("/update-order-update/:id",authenticateBoth, updateOrder);

// Delete an order by ID
orderRouter.delete("/delete-order-delete/:id",authenticateBoth, deleteOrder);

// Get comments for an order
orderRouter.get('/order/:id/comments', authenticateBoth, OrderComments);

// Get driver for an order
orderRouter.get('/order/:id/driver', authenticateBoth, OrderDriver);

// Get address for an order
orderRouter.get('/order/:id/address', authenticateBoth, OrderAddress);

// Get statuses for an order
orderRouter.get('/order/:id/deets', authenticateBoth, listOtherOrderDetails);

//GET /api/orders/details?orderId=5
//GET /api/orders/details?limit=10


// Get user for an order
orderRouter.get('/order/:id/user', authenticateBoth, OrderUsers);
