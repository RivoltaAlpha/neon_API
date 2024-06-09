import { Context } from "hono";
import {
    getAddressService,
    createAddressService,
    updateAddressService,
    deleteAddressService
} from "./address.services";

// Get Address
export const getAddress = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const address = await getAddressService(id);
        if (address === null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};

// Create Address
export const createAddress = async (c: Context) => {
    try {
        const addressData = await c.req.json();
        const createdAddress = await createAddressService(addressData);

        return c.json({ msg: createdAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update Address
export const updateAddress = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const addressData = await c.req.json();
        const updatedAddress = await updateAddressService(id, addressData);

        return c.json({ msg: updatedAddress }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete Address
export const deleteAddress = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const deletedAddress = await deleteAddressService(id);

        return c.json({ msg: deletedAddress }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
