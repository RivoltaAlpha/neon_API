import { Hono } from "hono";
import { getDriver, createDriver, updateDriver, deleteDriver } from "./driver.controller";
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validator";
import { authenticateUser, authenticateAdmin } from "../middleware/auth";

export const driverRouter = new Hono();
driverRouter.use('*', authenticateAdmin);

// Get a single Driver
driverRouter.get("/drivers/:id", authenticateUser, getDriver);

// Create a Driver
driverRouter.post("/drivers",
    zValidator("json", driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error ,400);
        }
    }),
    createDriver);

// Update a Driver
driverRouter.put("/drivers/:id", updateDriver);

// Delete a Driver
driverRouter.delete("/drivers/:id", deleteDriver);
