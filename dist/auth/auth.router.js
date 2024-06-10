"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_controller_1 = require("../auth/auth.controller");
exports.authRouter = new hono_1.Hono();
exports.authRouter.post('/register', (0, zod_validator_1.zValidator)("json", validator_1.registerUserShema, (result, c) => {
    if (!result.success) {
        return c.json({ error: result.error.message }, 400);
    }
}), auth_controller_1.registerUser);
exports.authRouter.post('/login', (0, zod_validator_1.zValidator)("json", validator_1.loginUserShema, (result, c) => {
    if (!result.success) {
        return c.json({ error: result.error.message }, 400);
    }
}), auth_controller_1.loginUser);
