"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityService = exports.updateCityService = exports.createCityService = exports.getCityService = exports.listCityService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const listCityService = async (limit) => {
    if (limit) {
        return await db_1.default.query.city.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.city.findMany();
};
exports.listCityService = listCityService;
async function getCityService(id) {
    return db_1.default.select().from(schema_1.city).where((0, drizzle_orm_1.eq)(schema_1.city.id, id));
}
exports.getCityService = getCityService;
;
const createCityService = async (cityData) => {
    await db_1.default.insert(schema_1.city).values(cityData);
    return "City created successfully";
};
exports.createCityService = createCityService;
const updateCityService = async (id, cityData) => {
    await db_1.default.update(schema_1.city).set(cityData).where((0, drizzle_orm_1.eq)(schema_1.city.id, id));
    return "City updated successfully";
};
exports.updateCityService = updateCityService;
const deleteCityService = async (id) => {
    await db_1.default.delete(schema_1.city).where((0, drizzle_orm_1.eq)(schema_1.city.id, id));
    return "City deleted successfully";
};
exports.deleteCityService = deleteCityService;
