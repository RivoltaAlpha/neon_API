import  {db}  from '../drizzle/db';
import { sql} from 'drizzle-orm';
import { TIAuthUser,TSAuthUser,authUser, users } from "../drizzle/schema";


// export const authUserService = async (user: TIAuthUser): Promise<string | null> => {
//     await db.insert(authUser).values(user)
//     return "User created successfully";
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

export const authUserService = async (user: any) => {
    try {
      // Insert user into `users` table
      const createdUser = await db.insert(users).values({
        name: user.name,
        contact_phone: user.contact_phone,
        phone_verified: false,
        email: user.email,
        email_verified: false,
        confirmation_code: user.confirmation_code,
        password: user.password,
        created_at: sql`now()`,
        updated_at: sql`now()`
      }).returning();
  
      // Extract the created user ID
      const userId = createdUser[0].id;
  
      // Insert user into `auth_user` table
      await db.insert(authUser).values({
        userId,
        password: user.password,
        username: user.username,
        role: user.role || 'user'
      });
  
      return createdUser[0]; // Return the created user
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  };