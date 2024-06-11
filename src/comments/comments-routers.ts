import { Hono } from "hono";
import { getComment, createComment, updateComment, deleteComment } from "./comments.contoller";
import { zValidator } from "@hono/zod-validator";
import { commentSchema} from "../validator";
import { authenticateUser, authenticateAdmin } from "../middleware/auth";

export const commentRouter = new Hono();
// auths
commentRouter.use('*', authenticateAdmin);

// Get a single Comment
commentRouter.get("/comments/:id", authenticateUser, getComment);

// Create a Comment
commentRouter.post("/comments",
    zValidator("json", commentSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
      authenticateUser, createComment);

// Update a Comment
commentRouter.put("/comments/:id", authenticateUser, updateComment);

// Delete a Comment
commentRouter.delete("/comments/:id", authenticateUser, deleteComment);
