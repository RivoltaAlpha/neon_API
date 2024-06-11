import { Hono, Context } from "hono";
import { getUser,createUser,updateUser,deleteUser,getComments,getOrders,listUsers } from "./contoller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validator";
import { authenticateUser, authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const userRouter = new Hono();

// Apply authenticateUser middleware to all routes
userRouter.use('*', authenticateBoth);

//get a single user    api/users/1
userRouter.get("/users/:id", getUser)

//get all users      api/users
userRouter.get("/users", listUsers);

// quserRouter.get("/users/:id","admin",  getUser)

// create a user 
userRouter.post("/users", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser);


// PUT /user/:id
userRouter.put("/user/:id",authenticateUser,async (c: Context) => updateUser(c));

// DELETE /user/:id
userRouter.delete("/user/:id", async (c: Context) => deleteUser(c));

// GET /user/:id/orders
userRouter.get("/user/:id/orders", async (c: Context) => getOrders(c));

// GET /user/:id/comments
userRouter.get("/user/:id/comments", async (c: Context) => getComments(c));
