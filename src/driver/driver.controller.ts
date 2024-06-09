import { Context } from "hono";
import {
    getDriverService,
    createDriverService,
    updateDriverService,
    deleteDriverService
} from "./driver.services";

// Get Driver
export const getDriver = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const driver = await getDriverService(id);
        if (driver === null) {
            return c.text("Driver not found", 404);
        }
        return c.json(driver, 200);
    } catch (error: any) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};

// Create Driver
export const createDriver = async (c: Context) => {
    try {
        const driverData = await c.req.json();
        const createdDriver = await createDriverService(driverData);

        return c.json({ msg: createdDriver }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update Driver
export const updateDriver = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const driverData = await c.req.json();
        const updatedDriver = await updateDriverService(id, driverData);

        return c.json({ msg: updatedDriver }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete Driver
export const deleteDriver = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const deletedDriver = await deleteDriverService(id);

        return c.json({ msg: deletedDriver }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
