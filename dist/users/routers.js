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
exports.userRouter.use('*', auth_1.authenticateAdmin);
//get a single user    api/users/1
exports.userRouter.get("/users/:id", auth_1.authenticateUser, contoller_1.getUser);
//get all users      api/users
exports.userRouter.get("/users", contoller_1.listUsers);
// quserRouter.get("/users/:id","admin",  getUser)
// create a user 
exports.userRouter.post("/users", (0, zod_validator_1.zValidator)('json', validator_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), contoller_1.createUser);
// PUT /user/:id
exports.userRouter.put("/user/:id", auth_1.authenticateUser, async (c) => (0, contoller_1.updateUser)(c));
// DELETE /user/:id
exports.userRouter.delete("/user/:id", async (c) => (0, contoller_1.deleteUser)(c));
// GET /user/:id/orders
exports.userRouter.get("/user/:id/orders", async (c) => (0, contoller_1.getOrders)(c));
// GET /user/:id/comments
exports.userRouter.get("/user/:id/comments", async (c) => (0, contoller_1.getComments)(c));
