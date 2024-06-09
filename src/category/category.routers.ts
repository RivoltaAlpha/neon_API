import { Hono } from "hono";
import { getCategory, createCategory, updateCategory, deleteCategory } from "./category.controller";
import { zValidator } from "@hono/zod-validator";
import { categorySchema} from "../validator";

export const categoryRouter = new Hono();

// Get a single Category
categoryRouter.get("/categories/:id", getCategory);

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
