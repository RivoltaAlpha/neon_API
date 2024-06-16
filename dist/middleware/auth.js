"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateOwner = exports.authenticateDriver = exports.authenticateBoth = exports.authenticateUser = exports.authenticateAdmin = exports.authMiddleware = exports.verifyToken = void 0;
require("dotenv/config");
const jwt_1 = require("hono/jwt");
// middleware
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
    const token = c.req.header('Authorization')?.replace("Bearer ", "").trim();
    console.log("Token:", token);
    if (!token)
        return c.json({ error: 'Provide correct Token😒😒😒😏' }, 401);
    const decoded = await (0, exports.verifyToken)(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    if (!decoded)
        return c.json({ error: 'Invalid token 😏😏😏😏' }, 401);
    // check roles ''
    // Role check
    const userRole = decoded.role;
    console.log("User Role:", userRole);
    console.log("Required Role:", requiredRole);
    // Authorization
    if ((requiredRole === "both" && (userRole === "admin" || userRole === "user")) ||
        userRole === requiredRole) {
        c.req.user = decoded;
        return next();
    }
    return c.json({ error: "'Forbidden because you are Unauthorised😭😭😭😭😭" }, 403);
};
exports.authMiddleware = authMiddleware;
const authenticateAdmin = async (c, next) => await (0, exports.authMiddleware)(c, next, "admin");
exports.authenticateAdmin = authenticateAdmin;
const authenticateUser = async (c, next) => await (0, exports.authMiddleware)(c, next, "user");
exports.authenticateUser = authenticateUser;
const authenticateBoth = async (c, next) => await (0, exports.authMiddleware)(c, next, "both");
exports.authenticateBoth = authenticateBoth;
const authenticateDriver = async (c, next) => await (0, exports.authMiddleware)(c, next, "driver");
exports.authenticateDriver = authenticateDriver;
const authenticateOwner = async (c, next) => await (0, exports.authMiddleware)(c, next, "restaurant_owner");
exports.authenticateOwner = authenticateOwner;
