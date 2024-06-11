import { Context } from "hono";
import {
  getOrderService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
  listService
} from "./orders.services";

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

// export const searchOrders = async (c: Context) => {
//   try {
//       const query = c.req.query();
//       const orders = await searchOrdersService(query);
//       return c.json(orders, 200);
//   } catch (error: any) {
//       return c.json({ error: error?.message }, 400);
//   }
// }
