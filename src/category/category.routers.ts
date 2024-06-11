import { Hono } from "hono";
import { getCategory, createCategory, updateCategory, deleteCategory } from "./category.controller";
import { zValidator } from "@hono/zod-validator";
import { categorySchema} from "../validator";
import { authenticateBoth, authenticateAdmin } from "../middleware/auth";

export const categoryRouter = new Hono();

// Get a single Category
categoryRouter.get("/categories/:id", authenticateBoth, getCategory);

// Create a Category
categoryRouter.post("/categories", 
    zValidator("json", categorySchema, (result, c) => {
        if(!result.success){
            return c.json(result.error, 400);
        }
    }),
    authenticateAdmin, createCategory);

// Update a Category
categoryRouter.put("/categories/:id", authenticateAdmin, updateCategory);

// Delete a Category
categoryRouter.delete("/categories/:id",authenticateAdmin, deleteCategory);
