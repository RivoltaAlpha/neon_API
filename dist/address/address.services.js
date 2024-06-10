"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressService = exports.updateAddressService = exports.createAddressService = exports.getAddressService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
async function getAddressService(id) {
    return db_1.default.select().from(schema_1.address).where((0, drizzle_orm_1.eq)(schema_1.address.id, id));
}
exports.getAddressService = getAddressService;
;
const createAddressService = async (addressData) => {
    await db_1.default.insert(schema_1.address).values(addressData);
    return "Address created successfully";
};
exports.createAddressService = createAddressService;
const updateAddressService = async (id, addressData) => {
    await db_1.default.update(schema_1.address).set(addressData).where((0, drizzle_orm_1.eq)(schema_1.address.id, id));
    return "Address updated successfully";
};
exports.updateAddressService = updateAddressService;
const deleteAddressService = async (id) => {
    await db_1.default.delete(schema_1.address).where((0, drizzle_orm_1.eq)(schema_1.address.id, id));
    return "Address deleted successfully";
};
exports.deleteAddressService = deleteAddressService;
