"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStateService = exports.updateStateService = exports.createStateService = exports.getStateService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
async function getStateService(id) {
    return db_1.default.select().from(schema_1.state).where((0, drizzle_orm_1.eq)(schema_1.state.id, id));
}
exports.getStateService = getStateService;
;
const createStateService = async (stateData) => {
    await db_1.default.insert(schema_1.state).values(stateData);
    return "State created successfully";
};
exports.createStateService = createStateService;
const updateStateService = async (id, stateData) => {
    await db_1.default.update(schema_1.state).set(stateData).where((0, drizzle_orm_1.eq)(schema_1.state.id, id));
    return "State updated successfully";
};
exports.updateStateService = updateStateService;
const deleteStateService = async (id) => {
    await db_1.default.delete(schema_1.state).where((0, drizzle_orm_1.eq)(schema_1.state.id, id));
    return "State deleted successfully";
};
exports.deleteStateService = deleteStateService;
