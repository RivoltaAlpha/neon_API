import { Context } from "hono";
import {
  getOrderService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
  listService,
  getOrderAddress,
  getOrderComments,
  getOrderDriver,
  getOrderUser,
  listOtherAssociatedServices
} from "./orders.services";

// List all orders with related details
export const listOtherOrderDetails = async (c: Context) => {
  try {
    const limit = Number(c.req.query('limit'));

    const data = await listOtherAssociatedServices(limit);
    if (data == null || data.length == 0) {
      return c.text("Orders not found", 404);
    }
    return c.json(data, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
}

//get all
export const listUsers = async (c: Context) => {
  try {
      //limit the number of users to be returned

      const limit = Number(c.req.query('limit'))

      const data = await listService(limit);
      if (data == null || data.length == 0) {
          return c.text("User not found", 404)
      }
      return c.json(data, 200);
  } catch (error: any) {
      return c.json({ error: error?.message }, 400)
  }
}

// Get order by ID
export const getOrder = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order = await getOrderService(id);
    if (order === null) {
      return c.text("Order not found", 404);
    }
    return c.json(order, 200);
  } catch (error: any) {
    console.error(error?.message);
    return c.json({ error: error?.message }, 500);
  }
};

// Create an order
export const createOrder = async (c: Context) => {
  try {
    const order = await c.req.json();
    const createdOrder = await createOrderService(order);

    if (!createdOrder) return c.text("Order not created", 404);
    return c.json({ msg: createdOrder }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Update an order by ID
export const updateOrder = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const order = await c.req.json();
  try {
    const searchedOrder = await getOrderService(id);
    if (searchedOrder == undefined) return c.text("Order not found", 404);

    const res = await updateOrderService(id, order);
    if (!res) return c.text("Order not updated", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Delete an order by ID
export const deleteOrder = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  try {
    const order = await getOrderService(id);
    if (order == undefined) return c.text("Order not found", 404);

    const res = await deleteOrderService(id);
    if (!res) return c.text("Order not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Get comments for an order
export const OrderComments = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comments = await getOrderComments(id);
    if (comments === null || comments.length === 0) {
      return c.text("No comments found for this order", 404);
    }
    return c.json(comments, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Get driver for an order
export const OrderDriver = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await getOrderDriver(id);
    if (driver === null || driver.length === 0) {
      return c.text("No driver found for this order", 404);
    }
    return c.json(driver, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Get address for an order
export const OrderAddress = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const address = await getOrderAddress(id);
    if (address === null || address.length === 0) {
      return c.text("No address found for this order", 404);
    }
    return c.json(address, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Get user for an order
export const OrderUsers = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getOrderUser(id);
    if (user === null || user.length === 0) {
      return c.text("No user found for this order", 404);
    }
    return c.json(user, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

