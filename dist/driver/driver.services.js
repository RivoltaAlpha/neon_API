"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriverService = exports.updateDriverService = exports.createDriverService = exports.getDriverService = exports.listService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const listService = async (limit) => {
    if (limit) {
        return await db_1.default.query.driver.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.driver.findMany();
};
exports.listService = listService;
async function getDriverService(id) {
    return db_1.default.select().from(schema_1.driver).where((0, drizzle_orm_1.eq)(schema_1.driver.id, id));
}
exports.getDriverService = getDriverService;
;
const createDriverService = async (driverData) => {
    await db_1.default.insert(schema_1.driver).values(driverData);
    return "Driver created successfully";
};
exports.createDriverService = createDriverService;
const updateDriverService = async (id, driverData) => {
    await db_1.default.update(schema_1.driver).set(driverData).where((0, drizzle_orm_1.eq)(schema_1.driver.id, id));
    return "Driver updated successfully";
};
exports.updateDriverService = updateDriverService;
const deleteDriverService = async (id) => {
    await db_1.default.delete(schema_1.driver).where((0, drizzle_orm_1.eq)(schema_1.driver.id, id));
    return "Driver deleted successfully";
};
exports.deleteDriverService = deleteDriverService;
