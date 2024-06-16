"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRouter = void 0;
const hono_1 = require("hono");
const status_controller_1 = require("./status-controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_1 = require("../middleware/auth");
exports.statusRouter = new hono_1.Hono();
// Apply authenticateBoth middleware to these routes
exports.statusRouter.get('/status-catalog-all', auth_1.authenticateBoth, status_controller_1.listSC);
exports.statusRouter.get("/status-catalog/:id", auth_1.authenticateBoth, status_controller_1.getService);
// Apply authenticateAdmin middleware to these routes
exports.statusRouter.post("/create-status-category", (0, zod_validator_1.zValidator)("json", validator_1.status_catalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_1.authenticateAdmin, status_controller_1.createService);
// Update a state by ID
exports.statusRouter.put("/update-status-category/:id", auth_1.authenticateAdmin, status_controller_1.updateService);
// Delete a state by ID
exports.statusRouter.delete("/delete-status-category/:id", auth_1.authenticateAdmin, status_controller_1.deleteService);
