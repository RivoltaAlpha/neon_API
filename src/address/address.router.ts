import { Hono } from "hono";
import {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  listAddresses
} from "./address.contoller";
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validator";
import { authenticateBoth, authenticateAdmin } from "../middleware/auth";

export const addressRouter = new Hono();
// list all
addressRouter.get("/list-addresses", authenticateBoth, listAddresses);

// Get a single Address
addressRouter.get("/addresses/:id", authenticateBoth, getAddress);

// Create an Address
addressRouter.post(
  "/create-address",
  zValidator("json", addressSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  authenticateAdmin, createAddress
);

// Update an Address
addressRouter.put("/update-addresses/:id", authenticateAdmin, updateAddress);

// Delete an Address
addressRouter.delete("/delete-addresses/:id", authenticateAdmin, deleteAddress);
