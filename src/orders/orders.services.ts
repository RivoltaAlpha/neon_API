import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {
  TIOrder,
  TSOrder,
  orders,
} from "../drizzle/schema";

export const listService = async (
  limit?: number
): Promise<TSOrder[] | null> => {
  if (limit) {
    return await db.query.orders.findMany({
      limit: limit,
    });
  }
  return await db.query.orders.findMany();
};

export async function getOrderService(
  id: TSOrder["id"]
): Promise<Array<TSOrder>> {
  return db.select().from(orders).where(eq(orders.id, id));
}

export const createOrderService = async (orderData: TIOrder) => {
  await db.insert(orders).values(orderData);
  return "Order created successfully";
};

export const updateOrderService = async (id: number, orderData: TIOrder) => {
  await db.update(orders).set(orderData).where(eq(orders.id, id));
  return "Order updated successfully";
};

export const deleteOrderService = async (id: number) => {
  await db.delete(orders).where(eq(orders.id, id));
  return "Order deleted successfully";
};
// Additional services to get related data
export const getOrderComments =  async (orderId: number) => {
    return await db.query.orders.findMany({
      where: (fields, { eq }) => eq(fields.id, orderId),
      columns: {
        id: true,
      },
      with: {
        comments: {
            columns: {
              comment: true,
              is_complaint: true,
            },
          },
      },
    });
  };

export const getOrderDriver =  async (orderId: number) => {
    return await db.query.orders.findMany({
      where: (fields, { eq }) => eq(fields.id, orderId),
      columns: {
        id: true,
      },
      with: {
        driver: {
            columns: {
              id: true,
              user_id: true,
              online: true,
              delivering: true,
            },
          },
      },
    });
  };

export const getOrderAddress = async (orderId: number) => {
    return await db.query.orders.findMany({
      where: (fields, { eq }) => eq(fields.id, orderId),
      columns: {
        id: true,
      },
      with: {
        delivery_address: {
            columns: {
              street_address_1: true,
            },
            with: {
              city: {
                columns: {
                  name: true,
                },
                with: {
                  state: {
                    columns: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
      },
    });
  };
export const getOrderUser = async (orderId: number) => {
  return await db.query.orders.findMany({
    where: (fields, { eq }) => eq(fields.id, orderId),
    columns: {
      id: true,
    },
    with: {
      user: {
        columns: {
          name: true,
          contact_phone: true,
          email: true,
        },
      },
    },
  });
};

export const getOrderDetails = async (id: number) => {
  return await db.query.orders.findMany({
    where: (fields, { eq }) => eq(fields.id, id),
    columns: {
      id: true,
      actual_delivery_time: true,
      delivery_address_id: true,
      driver_id: true,
      final_price: true,
    },
    with: {
      restaurant: {
        columns: {
          name: true,
          street_address: true,
        },
      },
      delivery_address: {
        columns: {
          street_address_1: true,
        },
        with: {
          city: {
            columns: {
              name: true,
            },
            with: {
              state: {
                columns: {
                  name: true,
                },
              },
            },
          },
        },
      },
      user: {
        columns: {
          name: true,
          contact_phone: true,
          email: true,
        },
      },
      driver: {
        columns: {
          id: true,
          user_id: true,
          online: true,
          delivering: true,
        },
      },
      comments: {
        columns: {
          comment: true,
          is_complaint: true,
        },
      },
    },
  });
};
