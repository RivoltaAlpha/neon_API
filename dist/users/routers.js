"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const contoller_1 = require("./contoller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_1 = require("../middleware/auth");
exports.userRouter = new hono_1.Hono();
// Apply authenticateUser middleware to all routes
// userRouter.use('*', authenticateBoth);
//get a single user    api/users/1
exports.userRouter.get("/user/:id", auth_1.authenticateBoth, contoller_1.getUser);
//get all users      api/users
exports.userRouter.get("/users", auth_1.authenticateBoth, contoller_1.listUsers);
// quserRouter.get("/users/:id","admin",  getUser)
// create a user 
exports.userRouter.post("/create_user", (0, zod_validator_1.zValidator)('json', validator_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), contoller_1.createUser);
// PUT /user/:id
exports.userRouter.put("/update-user/:id", auth_1.authenticateAdmin, async (c) => (0, contoller_1.updateUser)(c));
// DELETE /user/:id
exports.userRouter.delete("/delete-user/:id", auth_1.authenticateAdmin, async (c) => (0, contoller_1.deleteUser)(c));
// GET /user/:id/orders
exports.userRouter.get("/user/:id/orders", auth_1.authenticateBoth, async (c) => (0, contoller_1.getOrders)(c));
// GET /user/:id/comments
exports.userRouter.get("/user/:id/comments", auth_1.authenticateBoth, async (c) => (0, contoller_1.getComments)(c));
// user owned restaurants
exports.userRouter.get("/users/:id/owned-restaurants", auth_1.authenticateBoth, contoller_1.getUserOwnedRestaurantsController);
// all details
exports.userRouter.get("/user-details/:id", auth_1.authenticateBoth, contoller_1.getAllUserDetails);
