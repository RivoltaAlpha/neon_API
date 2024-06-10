"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const hono_1 = require("hono");
const address_contoller_1 = require("./address.contoller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.addressRouter = new hono_1.Hono();
// Get a single Address
exports.addressRouter.get("/addresses/:id", address_contoller_1.getAddress);
// Create an Address
exports.addressRouter.post("/addresses", (0, zod_validator_1.zValidator)("json", validator_1.addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), address_contoller_1.createAddress);
// Update an Address
exports.addressRouter.put("/addresses/:id", address_contoller_1.updateAddress);
// Delete an Address
exports.addressRouter.delete("/addresses/:id", address_contoller_1.deleteAddress);
