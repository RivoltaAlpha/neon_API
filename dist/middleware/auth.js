"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.authenticateAdmin = exports.authMiddleware = exports.verifyToken = void 0;
require("dotenv/config");
const jwt_1 = require("hono/jwt");
// where we are authenticating
const verifyToken = async (token, secret) => {
    try {
        const decoded = await (0, jwt_1.verify)(token, secret);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
// where we are authorizing
const authMiddleware = async (c, next, requiredRole) => {
    const token = c.req.header('Authorization');
    if (!token)
        return c.json({ error: 'Provide Token😒😒😒' }, 401);
    const decoded = await (0, exports.verifyToken)(token, process.env.JWT_SECRET);
    if (!decoded)
        return c.json({ error: 'Invalid token' }, 401);
    // check roles 'Forbidden😏😏😏😏😏'
    // Authorization
    if (decoded.role !== requiredRole)
        return c.json({ error: "'Forbidden😏😭😭😭😭😭'" }, 401);
    return next();
};
exports.authMiddleware = authMiddleware;
// roles
const authenticateAdmin = async (c, next) => (0, exports.authMiddleware)(c, next, "admin");
exports.authenticateAdmin = authenticateAdmin;
const authenticateUser = async (c, next) => (0, exports.authMiddleware)(c, next, "user");
exports.authenticateUser = authenticateUser;
