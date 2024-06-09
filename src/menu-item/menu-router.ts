import { Hono } from "hono";
import { getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem } from "./menu-controller";
import { zValidator } from "@hono/zod-validator";
import { menu_itemSchema } from "../validator";

export const menuItemRouter = new Hono();

// Get a single MenuItem
menuItemRouter.get("/menu_items/:id", getMenuItem);

// Create a MenuItem
menuItemRouter.post("/menu_items",
    zValidator("json", menu_itemSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
    createMenuItem);

// Update a MenuItem
menuItemRouter.put("/menu_items/:id", updateMenuItem);

// Delete a MenuItem
menuItemRouter.delete("/menu_items/:id", deleteMenuItem);
