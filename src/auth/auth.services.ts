import  {db}  from '../drizzle/db';
import { sql} from 'drizzle-orm';
import { TIAuthUser,TSAuthUser,authUser } from "../drizzle/schema";


export const authUserService = async (user: TIAuthUser): Promise<string | null> => {
    await db.insert(authUser).values(user)
    return "User created successfully";
}

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

export const loginAuthService = async (user: TSAuthUser) => {
    const { username, password } = user;
    return await db.query.authUser.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        }, where: sql` ${authUser.username} = ${username}`,
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
    })
}
