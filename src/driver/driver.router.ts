import { Hono } from "hono";
import { getDriver, createDriver, updateDriver, deleteDriver,listDrivers } from "./driver.controller";
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validator";
import { authenticateAdmin, authenticateBoth } from "../middleware/auth";

export const driverRouter = new Hono();
//list all
driverRouter.get('/list-drivers', authenticateBoth, listDrivers);

// Get a single Driver
driverRouter.get("/drivers/:id", authenticateBoth, getDriver);

// Create a Driver
driverRouter.post("/create-drivers",
    zValidator("json", driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error ,400);
        }
    }),
    authenticateAdmin, createDriver);

// Update a Driver
driverRouter.put("/update-drivers/:id",authenticateAdmin, updateDriver);

// Delete a Driver
driverRouter.delete("/delete-drivers/:id" ,authenticateAdmin, deleteDriver);
