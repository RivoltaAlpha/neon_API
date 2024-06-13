import { Hono } from "hono";
import { getOrderMenuItem, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem } from "./order-menu.controller";
import { zValidator } from "@hono/zod-validator";
import { order_menu_itemSchema } from "../validator";
import { authenticateBoth, authenticateAdmin } from "../middleware/auth";

export const orderMenuItemRouter = new Hono();
//list all
orderMenuItemRouter.get('/list-order-menu-items', authenticateAdmin, getOrderMenuItem);

// Get a single OrderMenuItem
orderMenuItemRouter.get("/order-menu-items/:id",authenticateBoth, getOrderMenuItem);

// Create a OrderMenuItem
orderMenuItemRouter.post("/order_menu_items", 
    zValidator("json", order_menu_itemSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
    authenticateAdmin, createOrderMenuItem);

// Update a OrderMenuItem
orderMenuItemRouter.put("/update-order-menu-items/:id", authenticateAdmin, updateOrderMenuItem);

// Delete a OrderMenuItem
orderMenuItemRouter.delete("/delete-order-menu-items/:id",authenticateAdmin, deleteOrderMenuItem);
