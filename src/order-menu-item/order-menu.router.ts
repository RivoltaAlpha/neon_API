import { Hono } from "hono";
import { getOrderMenuItem, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem } from "./order-menu.controller";
import { zValidator } from "@hono/zod-validator";
import { order_menu_itemSchema } from "../validator";
export const orderMenuItemRouter = new Hono();

// Get a single OrderMenuItem
orderMenuItemRouter.get("/order_menu_items/:id", getOrderMenuItem);

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
