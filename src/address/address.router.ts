import { Hono } from "hono";
import {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} from "./address.contoller";
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validator";
import { authenticateBoth, authenticateAdmin } from "../middleware/auth";

export const addressRouter = new Hono();

// Get a single Address
addressRouter.get("/addresses/:id", authenticateBoth, getAddress);

// Create an Address
addressRouter.post(
  "/addresses",
  zValidator("json", addressSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateAdmin, createAddress
);

// Update an Address
addressRouter.put("/addresses/:id", authenticateAdmin, updateAddress);

// Delete an Address
addressRouter.delete("/addresses/:id", authenticateAdmin, deleteAddress);
