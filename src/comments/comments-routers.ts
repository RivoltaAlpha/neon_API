import { Hono } from "hono";
import { getComment, createComment, updateComment, deleteComment } from "./comments.contoller";
import { zValidator } from "@hono/zod-validator";
import { commentSchema} from "../validator";

export const commentRouter = new Hono();

// Get a single Comment
commentRouter.get("/comments/:id", getComment);

// Create a Comment
commentRouter.post("/comments",
    zValidator("json", commentSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
    createComment);

// Update a Comment
commentRouter.put("/comments/:id", updateComment);

// Delete a Comment
commentRouter.delete("/comments/:id", deleteComment);
