"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalog = exports.updateServiceCatalog = exports.createServiceCatalog = exports.getServiceCatalog = exports.listScService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const listScService = async (limit) => {
    if (limit) {
        return await db_1.default.query.status_catalog.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.status_catalog.findMany();
};
exports.listScService = listScService;
async function getServiceCatalog(id) {
    return db_1.default.select().from(schema_1.status_catalog).where((0, drizzle_orm_1.eq)(schema_1.status_catalog.id, id));
}
exports.getServiceCatalog = getServiceCatalog;
;
const createServiceCatalog = async (data) => {
    await db_1.default.insert(schema_1.status_catalog).values(data);
    return "State created successfully";
};
exports.createServiceCatalog = createServiceCatalog;
const updateServiceCatalog = async (id, data) => {
    await db_1.default.update(schema_1.status_catalog).set(data).where((0, drizzle_orm_1.eq)(schema_1.status_catalog.id, id));
    return "State updated successfully";
};
exports.updateServiceCatalog = updateServiceCatalog;
const deleteStatusCatalog = async (id) => {
    await db_1.default.delete(schema_1.status_catalog).where((0, drizzle_orm_1.eq)(schema_1.status_catalog.id, id));
    return "Status catalog successfully deleted";
};
exports.deleteStatusCatalog = deleteStatusCatalog;
