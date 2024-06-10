import db from "../drizzle/db";
import { TIComment, TSComment, comment } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function   getCommentService (id: TSComment['id']): Promise<Array<TSComment>> {
    return db.select().from(comment).where(eq(comment.id, id));
};

export const createCommentService = async (commentData: TIComment) => {
    await db.insert(comment).values(commentData);
    return "Comment created successfully";
};

export const updateCommentService = async (id: number, commentData: TIComment) => {
    await db.update(comment).set(commentData).where(eq(comment.id, id));
    return "Comment updated successfully";
};

export const deleteCommentService = async (id: number) => {
    await db.delete(comment).where(eq(comment.id, id));
    return "Comment deleted successfully";
};
