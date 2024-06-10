import db from "../drizzle/db";
import { TICategory, TSCategory, category } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function  getCategoryService(id: TSCategory['id']): Promise<Array<TSCategory>> {
    return db.select().from(category).where(eq(category.id, id));
};

export const createCategoryService = async (categoryData: TICategory) => {
    await db.insert(category).values(categoryData);
    return "Category created successfully";
};

export const updateCategoryService = async (id: number, categoryData: TICategory) => {
    await db.update(category).set(categoryData).where(eq(category.id, id));
    return "Category updated successfully";
};

export const deleteCategoryService = async (id: number) => {
    await db.delete(category).where(eq(category.id, id));
    return "Category deleted successfully";
};
