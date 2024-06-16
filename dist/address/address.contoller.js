"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.createAddress = exports.getAddress = exports.listAddresses = void 0;
const address_services_1 = require("./address.services");
//get all
const listAddresses = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, address_services_1.listService)(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listAddresses = listAddresses;
// Get Address
const getAddress = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const address = await (0, address_services_1.getAddressService)(id);
        if (address === null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getAddress = getAddress;
// Create Address
const createAddress = async (c) => {
    try {
        const addressData = await c.req.json();
        const createdAddress = await (0, address_services_1.createAddressService)(addressData);
        return c.json({ msg: createdAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createAddress = createAddress;
// Update Address
const updateAddress = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const addressData = await c.req.json();
        const updatedAddress = await (0, address_services_1.updateAddressService)(id, addressData);
        return c.json({ msg: updatedAddress }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateAddress = updateAddress;
// Delete Address
const deleteAddress = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const deletedAddress = await (0, address_services_1.deleteAddressService)(id);
        return c.json({ msg: deletedAddress }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteAddress = deleteAddress;
