"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.createCity = exports.getCity = void 0;
const city_services_1 = require("./city.services");
// Get city by ID
const getCity = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const city = await (0, city_services_1.getCityService)(id);
        if (city === null) {
            return c.text("City not found", 404);
        }
        return c.json(city, 200);
    }
    catch (error) {
        console.error(error?.message);
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCity = getCity;
// Create a city
const createCity = async (c) => {
    try {
        const city = await c.req.json();
        const createdCity = await (0, city_services_1.createCityService)(city);
        if (!createdCity)
            return c.text("City not created", 404);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createCity = createCity;
// Update a city by ID
const updateCity = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const city = await c.req.json();
    try {
        const searchedCity = await (0, city_services_1.getCityService)(id);
        if (searchedCity == undefined)
            return c.text("City not found", 404);
        const res = await (0, city_services_1.updateCityService)(id, city);
        if (!res)
            return c.text("City not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCity = updateCity;
// Delete a city by ID
const deleteCity = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const city = await (0, city_services_1.getCityService)(id);
        if (city == undefined)
            return c.text("City not found", 404);
        const res = await (0, city_services_1.deleteCityService)(id);
        if (!res)
            return c.text("City not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCity = deleteCity;
