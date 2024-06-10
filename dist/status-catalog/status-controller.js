"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.createService = exports.getService = void 0;
const status_services_1 = require("./status-services");
// Get state by ID
const getService = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const status_catalog = await (0, status_services_1.getServiceCatalog)(id);
        if (!status_catalog) {
            return c.text("State not found", 404);
        }
        return c.json(status_catalog, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getService = getService;
// Create state
const createService = async (c) => {
    try {
        const data = await c.req.json();
        const createdMsg = await (0, status_services_1.createServiceCatalog)(data);
        if (!createdMsg)
            return c.text("State not created", 500);
        return c.json({ msg: createdMsg }, 201);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.createService = createService;
// Update state by ID
const updateService = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const data = await c.req.json();
        const updatedMsg = await (0, status_services_1.updateServiceCatalog)(id, data);
        if (!updatedMsg)
            return c.text("State not updated", 404);
        return c.json({ msg: updatedMsg }, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateService = updateService;
// Delete state by ID
const deleteService = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const deletedMsg = await (0, status_services_1.deleteStatusCatalog)(id);
        if (!deletedMsg)
            return c.text("State not deleted", 404);
        return c.json({ msg: deletedMsg }, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteService = deleteService;
