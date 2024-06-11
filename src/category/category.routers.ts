import { Hono } from "hono";
import { getCategory, createCategory, updateCategory, deleteCategory } from "./category.controller";
import { zValidator } from "@hono/zod-validator";
import { categorySchema} from "../validator";
import { authenticateUser, authenticateAdmin } from "../middleware/auth";

export const categoryRouter = new Hono();

// Apply authenticateUser middleware to all routes
categoryRouter.use('*', authenticateAdmin);


// Get a single Category
categoryRouter.get("/categories/:id", authenticateUser, getCategory);

// Create a Category
categoryRouter.post("/categories", 
    zValidator("json", categorySchema, (result, c) => {
        if(!result.success){
            return c.json(result.error, 400);
        }
    }),
    createCategory);

// Update a Category
categoryRouter.put("/categories/:id", updateCategory);

// Delete a Category
categoryRouter.delete("/categories/:id", deleteCategory);
