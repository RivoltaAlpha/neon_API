"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const hono_1 = require("hono");
const comments_contoller_1 = require("./comments.contoller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_1 = require("../middleware/auth");
exports.commentRouter = new hono_1.Hono();
//list all 
exports.commentRouter.get('/list-comments', comments_contoller_1.listComments);
// Get a single Comment
exports.commentRouter.get("/comments/:id", auth_1.authenticateBoth, comments_contoller_1.getComment);
// Create a Comment
exports.commentRouter.post("/create-comments", (0, zod_validator_1.zValidator)("json", validator_1.commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_1.authenticateBoth, comments_contoller_1.createComment);
// Update a Comment
exports.commentRouter.put("/update-comments/:id", auth_1.authenticateBoth, comments_contoller_1.updateComment);
// Delete a Comment
exports.commentRouter.delete("/delete-comments/:id", auth_1.authenticateBoth, comments_contoller_1.deleteComment);
