import { Hono } from "hono";
import { getCategory, createCategory, updateCategory, deleteCategory,listCategories } from "./category.controller";
import { zValidator } from "@hono/zod-validator";
import { categorySchema} from "../validator";
import { authenticateBoth, authenticateAdmin } from "../middleware/auth";

export const categoryRouter = new Hono();
// list all categories
categoryRouter.get('/list-categories', authenticateBoth, listCategories);

// Get a single Category
categoryRouter.get("/categories/:id", authenticateBoth, getCategory);

// Create a Category
categoryRouter.post("/create-categories", 
    zValidator("json", categorySchema, (result, c) => {
        if(!result.success){
            return c.json(result.error, 400);
        }
    }),
    authenticateAdmin, createCategory);

// Update a Category
categoryRouter.put("/update-categories/:id", authenticateAdmin, updateCategory);

// Delete a Category
categoryRouter.delete("/delete-categories/:id",authenticateAdmin, deleteCategory);
