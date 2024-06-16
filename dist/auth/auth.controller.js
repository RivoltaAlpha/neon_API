"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
require("dotenv/config");
const auth_services_1 = require("./auth.services");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("hono/jwt");
const email_1 = require("../emailing/email");
const registerUser = async (c) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bcrypt_1.default.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await (0, auth_services_1.authUserService)(user);
        if (!createdUser)
            return c.text("User not created😭😭", 404);
        // Check if email field exists
        if (!user.email) {
            throw new Error("Email field is missing in the user data");
        }
        // Send welcome email after successful user creation
        const subject = "Welcome to Our Restaurant Management System";
        const html = `
    <html>
      <head>
        <style>
          /* Inline CSS for basic styling */
          .email-container {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 5px;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 3px;
            transition: background-color 0.3s ease;
          }
          .btn:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <p>Hello, ${user.username}</p>
          <p>Thank you for registering with our Restaurant Management System!</p>
          <p>Welcome to our system!</p>
          <p>We help you manage your restaurant.</p>

          <img src="https://wallpapercave.com/wp/wp2038248.jpg" alt="Image" style="max-width: 100%; height: auto;">
          <a class="btn" href="https://restaurantsapi1.azurewebsites.net/api">Visit our Website</a>
        </div>
      </body>
    </html>
  `;
        // Send welcome email after successful user creation
        await (0, email_1.sendWelcomeEmail)(user.email, subject, html);
        return c.json({ msg: "User registered successfully", user: createdUser }, 201);
    }
    catch (error) {
        console.error('Error during registration:', error);
        return c.json({ error: error?.message }, 500);
    }
};
exports.registerUser = registerUser;
const loginUser = async (c) => {
    try {
        const user = await c.req.json();
        // check if user exists
        const foundUser = await (0, auth_services_1.loginAuthService)(user);
        if (!foundUser)
            return c.text("User not found😏", 404);
        // validate password
        const isValid = await bcrypt_1.default.compare(user.password, foundUser?.password);
        if (!isValid) {
            return c.json({ error: "Invalid credentials😏" }, 401); // unauthorized
        }
        else {
            // create a payload
            const payload = {
                sub: foundUser?.username,
                role: foundUser?.role,
                exp: Math.floor(Date.now() / 1000) + 60 * 180, // 3 hour  => SESSION EXPIRATION
            };
            let secret = process.env.JWT_SECRET; // secret key
            const token = await (0, jwt_1.sign)(payload, secret); // create a JWT token
            let user = foundUser?.user;
            let role = foundUser?.role;
            return c.json({ token, user: { role, ...user } }, 200); // return token and user details
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginUser = loginUser;
