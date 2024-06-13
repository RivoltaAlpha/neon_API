import { Hono } from "hono";
import { getComment, createComment, updateComment, deleteComment,listComments } from "./comments.contoller";
import { zValidator } from "@hono/zod-validator";
import { commentSchema} from "../validator";
import { authenticateBoth, authenticateAdmin } from "../middleware/auth";

export const commentRouter = new Hono();
//list all 
commentRouter.get('/list-comments', listComments);

// Get a single Comment
commentRouter.get("/comments/:id", authenticateBoth, getComment);

// Create a Comment
commentRouter.post("/create-comments",
    zValidator("json", commentSchema, (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }),
      authenticateBoth, createComment);

// Update a Comment
commentRouter.put("/update-comments/:id", authenticateBoth, updateComment);

// Delete a Comment
commentRouter.delete("/delete-comments/:id", authenticateBoth, deleteComment);
