import { Context } from "hono";
import bycrpt from 'bcrypt';
import {
  getUserById,
  createUserService,
  updateUserService,
  deleteUserService,
  getUserComments,
  getUserOrders,
  usersService,
  getUserOwnedRestaurants
} from "./services";

export const listUsers = async (c: Context) => {
  try {
      //limit the number of users to be returned

      const limit = Number(c.req.query('limit'))

      const data = await usersService(limit);
      if (data == null || data.length == 0) {
          return c.text("User not found", 404)
      }
      return c.json(data, 200);
  } catch (error: any) {
      return c.json({ error: error?.message }, 400)
  }
}

//search user
export const getUser = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getUserById(id);
    if (user === null) {
      return c.text("User not found", 404);
    }
    return c.json(user, 200);
  } catch (error: any) {
    console.error(error?.message);
  }
};

// create user
export const createUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const pass = user.password;
    const hashedPassword = await bycrpt.hash(pass, 10);
    user.password = hashedPassword;
    const createdUser = await createUserService(user);

    if (!createdUser) return c.text("User not created", 404);
    return c.json({ msg: createdUser }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
// updateUser
export const updateUser = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const user = await c.req.json();
  try {
    // search for the user
    const searchedUser = await getUserById(id);
    if (searchedUser == undefined) return c.text("User not found", 404);
    // get the data and update it
    const res = await updateUserService(id, user);
    // return a success message
    if (!res) return c.text("User not updated", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

//delete user
export const deleteUser = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  try {
    //search for the user
    const user = await getUserById(id);
    if (user == undefined) return c.text("User not found", 404);
    //deleting the user
    const res = await deleteUserService(id);
    if (!res) return c.text("User not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Get user orders
export const getOrders = async (c: Context) => {
    try {
      const id = parseInt(c.req.param("id"));
      if (isNaN(id)) return c.text("Invalid ID", 400);
  
      const orders = await getUserOrders(id);
  
      return c.json(orders, 200);
    } catch (error: any) {
      console.error(error?.message);
      return c.json({ error: "Failed to fetch user orders" }, 500);
    }
  };

  // Get user Comments
  export const getComments = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const comments = await getUserComments(id);
        return c.json(comments, 200);
    } catch (error: any) {
      console.error(error?.message);
      return c.json({ error: "Failed to fetch user orders" }, 500);
    }
  };

  export const getUserOwnedRestaurantsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const restaurants = await getUserOwnedRestaurants(id);
        if (restaurants.length === 0) {
            return c.text("No restaurants found for this user", 404);
        }
        return c.json(restaurants, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};