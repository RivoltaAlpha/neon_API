"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const hono_1 = require("hono");
const driver_controller_1 = require("./driver.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_1 = require("../middleware/auth");
exports.driverRouter = new hono_1.Hono();
//list all
exports.driverRouter.get('/list-drivers', auth_1.authenticateBoth, driver_controller_1.listDrivers);
// Get a single Driver
exports.driverRouter.get("/drivers/:id", auth_1.authenticateBoth, driver_controller_1.getDriver);
// Create a Driver
exports.driverRouter.post("/create-drivers", (0, zod_validator_1.zValidator)("json", validator_1.driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_1.authenticateAdmin, driver_controller_1.createDriver);
// Update a Driver
exports.driverRouter.put("/update-drivers/:id", auth_1.authenticateAdmin, driver_controller_1.updateDriver);
// Delete a Driver
exports.driverRouter.delete("/delete-drivers/:id", auth_1.authenticateAdmin, driver_controller_1.deleteDriver);
