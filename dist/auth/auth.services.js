"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserService = exports.loginAuthService = void 0;
const db_1 = require("../drizzle/db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
// export const authUserService = async (user: TIAuthUser): Promise<string | null> => {
//     await db.insert(authUser).values(user)
//     return "User created successfully";
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
const authUserService = async (user) => {
    try {
        // Insert user into `users` table
        const createdUser = await db_1.db.insert(schema_1.users).values({
            name: user.name,
            contact_phone: user.contact_phone,
            phone_verified: false,
            email: user.email,
            email_verified: false,
            confirmation_code: user.confirmation_code,
            password: user.password,
            created_at: (0, drizzle_orm_1.sql) `now()`,
            updated_at: (0, drizzle_orm_1.sql) `now()`
        }).returning();
        // Extract the created user ID
        const userId = createdUser[0].id;
        // Insert user into `auth_user` table
        await db_1.db.insert(schema_1.authUser).values({
            userId,
            password: user.password,
            username: user.username,
            role: user.role || 'user'
        });
        return createdUser[0]; // Return the created user
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new Error('User creation failed');
    }
};
exports.authUserService = authUserService;
