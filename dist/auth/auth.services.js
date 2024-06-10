"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuthService = exports.authUserService = void 0;
const db_1 = require("../drizzle/db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
const authUserService = async (user) => {
    await db_1.db.insert(schema_1.authUser).values(user);
    return "User created successfully";
};
exports.authUserService = authUserService;
// export const loginAuthService = async (user: TSAuthUser) => {
//     const { username, password } = user;
//     const data = await db.select().from(authUser).where(eq(authUser.userId, userId));
//     if (data.length > 0) {
//         const isPasswordValid = await bcrypt.compare(password, data[0].password);
//         if (isPasswordValid) {
//             return "logged in";
//         } else {
//             return "password incorrect";
//         }
//     } else {
//         return "user not found";
//     }
// }
const loginAuthService = async (user) => {
    const { username, password } = user;
    return await db_1.db.query.authUser.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        }, where: (0, drizzle_orm_1.sql) ` ${schema_1.authUser.username} = ${username}`,
        with: {
            user: {
                columns: {
                    id: true,
                    name: true,
                    contact_phone: true,
                    email: true
                }
            }
        }
    });
};
exports.loginAuthService = loginAuthService;
