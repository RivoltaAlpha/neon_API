"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriver = exports.updateDriver = exports.createDriver = exports.getDriver = void 0;
const driver_services_1 = require("./driver.services");
// Get Driver
const getDriver = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const driver = await (0, driver_services_1.getDriverService)(id);
        if (driver === null) {
            return c.text("Driver not found", 404);
        }
        return c.json(driver, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getDriver = getDriver;
// Create Driver
const createDriver = async (c) => {
    try {
        const driverData = await c.req.json();
        const createdDriver = await (0, driver_services_1.createDriverService)(driverData);
        return c.json({ msg: createdDriver }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createDriver = createDriver;
// Update Driver
const updateDriver = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const driverData = await c.req.json();
        const updatedDriver = await (0, driver_services_1.updateDriverService)(id, driverData);
        return c.json({ msg: updatedDriver }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateDriver = updateDriver;
// Delete Driver
const deleteDriver = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const deletedDriver = await (0, driver_services_1.deleteDriverService)(id);
        return c.json({ msg: deletedDriver }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteDriver = deleteDriver;
