"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentService = exports.updateCommentService = exports.createCommentService = exports.getCommentService = exports.listService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const listService = async (limit) => {
    if (limit) {
        return await db_1.default.query.comment.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.comment.findMany();
};
exports.listService = listService;
async function getCommentService(id) {
    return db_1.default.select().from(schema_1.comment).where((0, drizzle_orm_1.eq)(schema_1.comment.id, id));
}
exports.getCommentService = getCommentService;
;
const createCommentService = async (commentData) => {
    await db_1.default.insert(schema_1.comment).values(commentData);
    return "Comment created successfully";
};
exports.createCommentService = createCommentService;
const updateCommentService = async (id, commentData) => {
    await db_1.default.update(schema_1.comment).set(commentData).where((0, drizzle_orm_1.eq)(schema_1.comment.id, id));
    return "Comment updated successfully";
};
exports.updateCommentService = updateCommentService;
const deleteCommentService = async (id) => {
    await db_1.default.delete(schema_1.comment).where((0, drizzle_orm_1.eq)(schema_1.comment.id, id));
    return "Comment deleted successfully";
};
exports.deleteCommentService = deleteCommentService;
