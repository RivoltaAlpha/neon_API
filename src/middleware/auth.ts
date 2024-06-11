import "dotenv/config";
import { verify } from "hono/jwt";
import { Context, Next } from "hono";
// hono interface
interface HonoContext <T, U> {
    user?: T;
    // add any other properties if needed
    }
    
// middleware
// where we are authenticating
export const verifyToken = async (token:string, secret:string) => {
    try{
        const decoded = await verify(token as string, secret)
        return decoded;
    } catch (error: any) {
        return null;
    }
}
// where we are authorizing
export const authMiddleware = async (c:Context & {req: HonoContext<any, unknown> }, next: Next, requiredRole: string) => {
    const token = c.req.header('Authorization');

    if (!token) return c.json({ error: 'Provide Token😒😒😒 and this is Forbidden😏😏😏😏' }, 401);
    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);

    if (!decoded) return c.json({ error: 'Invalid token 😏😏😏😏' }, 401);

    // check roles ''
    // Authorization
    if (requiredRole === "both"){
        if (decoded.role === "admin" || decoded.role === "user"){
            c.req.user = decoded;
            return next();
            }
            } else if (decoded.role === requiredRole){
                c.req.user = decoded;
                return next();
        }
        return c.json({error: "'Forbidden because you are Unauthorised😏😭😭😭😭😭" }, 403);
        }


export const authenticateAdmin = async  (c: Context, next: Next) => await authMiddleware(c, next, "admin")
export const authenticateUser = async  (c: Context, next: Next) => await authMiddleware(c, next, "user")
export const authenticateBoth = async  (c: Context, next: Next) => await authMiddleware(c, next, "both")