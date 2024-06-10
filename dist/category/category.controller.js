"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = void 0;
const category_services_1 = require("./category.services");
// Get Category
const getCategory = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const category = await (0, category_services_1.getCategoryService)(id);
        if (category === null) {
            return c.text("Category not found", 404);
        }
        return c.json(category, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCategory = getCategory;
// Create Category
const createCategory = async (c) => {
    try {
        const categoryData = await c.req.json();
        const createdCategory = await (0, category_services_1.createCategoryService)(categoryData);
        return c.json({ msg: createdCategory }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createCategory = createCategory;
// Update Category
const updateCategory = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const categoryData = await c.req.json();
        const updatedCategory = await (0, category_services_1.updateCategoryService)(id, categoryData);
        return c.json({ msg: updatedCategory }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCategory = updateCategory;
// Delete Category
const deleteCategory = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const deletedCategory = await (0, category_services_1.deleteCategoryService)(id);
        return c.json({ msg: deletedCategory }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCategory = deleteCategory;
