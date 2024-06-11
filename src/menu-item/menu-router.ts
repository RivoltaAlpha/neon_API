import { Hono } from "hono";
import { getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem, listUsers } from "./menu-controller";
import { zValidator } from "@hono/zod-validator";
import { menu_itemSchema } from "../validator";
import { authenticateUser, authenticateBoth, authenticateAdmin } from "../middleware/auth";

export const menuItemRouter = new Hono();
//list all
menuItemRouter.get('/menu_items', authenticateBoth, listUsers);

// Get a single MenuItem
menuItemRouter.get("/menu_items/:id", authenticateBoth, getMenuItem);

// Create a MenuItem
menuItemRouter.post("/menu_items",
    zValidator("json", menu_itemSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
    authenticateAdmin ,createMenuItem);

// Update a MenuItem
menuItemRouter.put("/menu_items/:id", authenticateAdmin, updateMenuItem);

// Delete a MenuItem
menuItemRouter.delete("/menu_items/:id", authenticateAdmin, deleteMenuItem)