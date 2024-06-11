import { Hono } from "hono";
import { getDriver, createDriver, updateDriver, deleteDriver } from "./driver.controller";
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validator";
import { authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const driverRouter = new Hono();

// Get a single Driver
driverRouter.get("/drivers/:id", authenticateBoth, getDriver);

// Create a Driver
driverRouter.post("/drivers",
    zValidator("json", driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error ,400);
        }
    }),
    authenticateAdmin, createDriver);

// Update a Driver
driverRouter.put("/drivers/:id",authenticateAdmin, updateDriver);

// Delete a Driver
driverRouter.delete("/drivers/:id" ,authenticateAdmin, deleteDriver);
