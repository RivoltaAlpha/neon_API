import { Hono, Context } from "hono";
import { getUser,createUser,updateUser,deleteUser,getComments,getOrders,listUsers,getUserOwnedRestaurantsController } from "./contoller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validator";
import { authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const userRouter = new Hono();

// Apply authenticateUser middleware to all routes
// userRouter.use('*', authenticateBoth);

//get a single user    api/users/1
userRouter.get("/user/:id", authenticateBoth, getUser)

//get all users      api/users
userRouter.get("/users", authenticateBoth, listUsers);

// quserRouter.get("/users/:id","admin",  getUser)

// create a user 
userRouter.post("/create_user", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser);


// PUT /user/:id
userRouter.put("/update-user/:id",authenticateAdmin, async (c: Context) => updateUser(c));

// DELETE /user/:id
userRouter.delete("/delete-user/:id", authenticateAdmin, async (c: Context) => deleteUser(c));

// GET /user/:id/orders
userRouter.get("/user/:id/orders", authenticateBoth, async (c: Context) => getOrders(c));

// GET /user/:id/comments
userRouter.get("/user/:id/comments", authenticateBoth, async (c: Context) => getComments(c));

// user owned restaurants
userRouter.get("/users/:id/owned-restaurants", authenticateBoth, getUserOwnedRestaurantsController);