import { Hono } from "hono";
import { getOrderMenuItem, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem } from "./order-menu.controller";
import { zValidator } from "@hono/zod-validator";
import { order_menu_itemSchema } from "../validator";
import { authenticateUser, authenticateAdmin } from "../middleware/auth";

export const orderMenuItemRouter = new Hono();

orderMenuItemRouter.use('*', authenticateAdmin);

// Get a single OrderMenuItem
orderMenuItemRouter.get("/order_menu_items/:id",authenticateUser, getOrderMenuItem);

// Create a OrderMenuItem
orderMenuItemRouter.post("/order_menu_items", 
    zValidator("json", order_menu_itemSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
    createOrderMenuItem);

// Update a OrderMenuItem
orderMenuItemRouter.put("/order_menu_items/:id", updateOrderMenuItem);

// Delete a OrderMenuItem
orderMenuItemRouter.delete("/order_menu_items/:id", deleteOrderMenuItem);
