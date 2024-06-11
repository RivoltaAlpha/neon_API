"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateRouter = void 0;
const hono_1 = require("hono");
const state_controller_1 = require("./state.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_1 = require("../middleware/auth");
exports.stateRouter = new hono_1.Hono();
// Apply authenticateAdmin middleware to all routes by default
exports.stateRouter.use('*', auth_1.authenticateAdmin);
// Specific routes where authenticateUser should be used instead of authenticateAdmin
exports.stateRouter.get("/states/:id", auth_1.authenticateUser, state_controller_1.getState);
exports.stateRouter.get("/states", auth_1.authenticateUser, state_controller_1.listStates);
// // Get a single state by ID: api/states/1
// stateRouter.get("/states/:id", authenticateBoth, getState);
// stateRouter.get("/states", authenticateBoth, listStates);  
// Create a state
exports.stateRouter.post("/states", (0, zod_validator_1.zValidator)("json", validator_1.stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_1.authenticateAdmin, state_controller_1.createState);
// Update a state by ID
exports.stateRouter.put("/states/:id", auth_1.authenticateAdmin, state_controller_1.updateState);
// Delete a state by ID
exports.stateRouter.delete("/states/:id", auth_1.authenticateAdmin, state_controller_1.deleteState);
