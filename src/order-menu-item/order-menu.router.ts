import { Hono } from "hono";
import { getOrderMenuItem, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem } from "./order-menu.controller";
import { zValidator } from "@hono/zod-validator";
import { order_menu_itemSchema } from "../validator";
import { authenticateBoth, authenticateAdmin } from "../middleware/auth";

export const orderMenuItemRouter = new Hono();
//list all
orderMenuItemRouter.get('/order_menu_items', authenticateAdmin, getOrderMenuItem);

// Get a single OrderMenuItem
orderMenuItemRouter.get("/order_menu_items/:id",authenticateBoth, getOrderMenuItem);

// Create a OrderMenuItem
orderMenuItemRouter.post("/order_menu_items", 
    zValidator("json", order_menu_itemSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
    authenticateAdmin, createOrderMenuItem);

// Update a OrderMenuItem
orderMenuItemRouter.put("/order_menu_items/:id", authenticateAdmin, updateOrderMenuItem);

// Delete a OrderMenuItem
orderMenuItemRouter.delete("/order_menu_items/:id",authenticateAdmin, deleteOrderMenuItem);
