"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getComment = void 0;
const comments_services_1 = require("./comments.services");
// Get Comment
const getComment = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const comment = await (0, comments_services_1.getCommentService)(id);
        if (comment === null) {
            return c.text("Comment not found", 404);
        }
        return c.json(comment, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getComment = getComment;
// Create Comment
const createComment = async (c) => {
    try {
        const commentData = await c.req.json();
        const createdComment = await (0, comments_services_1.createCommentService)(commentData);
        return c.json({ msg: createdComment }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createComment = createComment;
// Update Comment
const updateComment = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const commentData = await c.req.json();
        const updatedComment = await (0, comments_services_1.updateCommentService)(id, commentData);
        return c.json({ msg: updatedComment }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateComment = updateComment;
// Delete Comment
const deleteComment = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const deletedComment = await (0, comments_services_1.deleteCommentService)(id);
        return c.json({ msg: deletedComment }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteComment = deleteComment;
