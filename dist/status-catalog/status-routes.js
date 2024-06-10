"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRouter = void 0;
const hono_1 = require("hono");
const status_controller_1 = require("./status-controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.statusRouter = new hono_1.Hono();
// Get a single state by ID: api/states/1
exports.statusRouter.get("/states/:id", status_controller_1.getService);
// Create a state
exports.statusRouter.post("/states", (0, zod_validator_1.zValidator)("json", validator_1.status_catalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), status_controller_1.createService);
// Update a state by ID
exports.statusRouter.put("/states/:id", status_controller_1.updateService);
// Delete a state by ID
exports.statusRouter.delete("/states/:id", status_controller_1.deleteService);
