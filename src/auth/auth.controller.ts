import { Context } from "hono";
import "dotenv/config";
import { authUserService, loginAuthService } from "./auth.services";
import bycrpt from "bcrypt";
import { sign } from "hono/jwt";
import { sendWelcomeEmail } from "../emailing/email";

export const registerUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const pass = user.password;
    const hashedPassword = await bycrpt.hash(pass, 10);
    user.password = hashedPassword;

    const createdUser = await authUserService(user);
    if (!createdUser) return c.text("User not created😭😭", 404);

    return c.json({ msg: createdUser }, 201);
    
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    // check if user exists
    const foundUser = await loginAuthService(user);
    if (!foundUser) return c.text("User not found😏", 404);

    // validate password
    const isValid = await bycrpt.compare(
      user.password,
      foundUser?.password as string
    );
    if (!isValid) {
      return c.json({ error: "Invalid credentials😏" }, 401); // unauthorized
    } else {
      // create a payload
      const payload = {
        sub: foundUser?.username,
        role: foundUser?.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 180, // 3 hour  => SESSION EXPIRATION
      };
      let secret = process.env.JWT_SECRET as string; // secret key
      const token = await sign(payload, secret); // create a JWT token
      let user = foundUser?.user;
      let role = foundUser?.role;
      return c.json({ token, user: { role, ...user } }, 200); // return token and user details
    }
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
