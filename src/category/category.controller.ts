import { Context } from "hono";
import {
    getCategoryService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService
} from "./category.services";

// Get Category
export const getCategory = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const category = await getCategoryService(id);
        if (category === null) {
            return c.text("Category not found", 404);
        }
        return c.json(category, 200);
    } catch (error: any) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};

// Create Category
export const createCategory = async (c: Context) => {
    try {
        const categoryData = await c.req.json();
        const createdCategory = await createCategoryService(categoryData);

        return c.json({ msg: createdCategory }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update Category
export const updateCategory = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const categoryData = await c.req.json();
        const updatedCategory = await updateCategoryService(id, categoryData);

        return c.json({ msg: updatedCategory }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete Category
export const deleteCategory = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const deletedCategory = await deleteCategoryService(id);

        return c.json({ msg: deletedCategory }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
