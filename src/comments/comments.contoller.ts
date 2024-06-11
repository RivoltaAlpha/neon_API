import { Context } from "hono";
import {
    getCommentService,
    createCommentService,
    updateCommentService,
    deleteCommentService,
    listService
} from "./comments.services";

//get all
export const listComments = async (c: Context) => {
    try {
        //limit the number of users to be returned
  
        const limit = Number(c.req.query('limit'))
  
        const data = await listService(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
  }

// Get Comment
export const getComment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const comment = await getCommentService(id);
        if (comment === null) {
            return c.text("Comment not found", 404);
        }
        return c.json(comment, 200);
    } catch (error: any) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};

// Create Comment
export const createComment = async (c: Context) => {
    try {
        const commentData = await c.req.json();
        const createdComment = await createCommentService(commentData);

        return c.json({ msg: createdComment }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update Comment
export const updateComment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const commentData = await c.req.json();
        const updatedComment = await updateCommentService(id, commentData);

        return c.json({ msg: updatedComment }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete Comment
export const deleteComment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const deletedComment = await deleteCommentService(id);

        return c.json({ msg: deletedComment }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
