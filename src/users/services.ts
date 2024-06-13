import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {
  TIUser,
  TSUser,
  users,

} from "../drizzle/schema";

export const usersService = async (
  limit?: number
): Promise<TSUser[] | null> => {
  if (limit) {
    return await db.query.users.findMany({
      limit: limit,
    });
  }
  return await db.query.users.findMany();
};

export async function getUserById(id: TSUser["id"]): Promise<Array<TSUser>> {
  return db.select().from(users).where(eq(users.id, id));
}

export async function createUserService(data: TIUser) {
  await db.insert(users).values(data);
  return "User created successfully";
}

export async function updateUserService(id: number, user: TIUser) {
  await db.update(users).set(user).where(eq(users.id, id));
  return "User updated successfully";
}

export async function deleteUserService(id: number) {
  await db.delete(users).where(eq(users.id, id));
  return "User deleted successfully";
}

export async function getUserOrders(id: number) {
    return await db.query.users.findMany({
      where: (fields, { eq }) => eq(fields.id, id),
      columns: {
        id: true,
        name: true,
      },
      with: {
        orders: {
            columns: {
                id: true,
                actual_delivery_time: true,
                delivery_address_id: true,
                driver_id: true,
                final_price: true,
            },
          },
      },
    });
  }

export async function getUserComments(id: number) {
    return await db.query.users.findMany({
      where: (fields, { eq }) => eq(fields.id, id),
      columns: {
        id: true,
        name: true,
      },
      with: {
        comments: {
            columns: {
              comment: true,
            },
          },
      },
    });
  }

export async function getUserOwnedRestaurants(id: number) {
  return await db.query.users.findMany({
    where: (fields, { eq }) => eq(fields.id, id),
    columns: {
      id: true,
      name: true,
    },
    with: {
      restaurant_owners: {
        columns: {
          restaurant_id: true,
        },
        with: {
          restaurant: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export const getUserDetails = async (id: number) => {
  return await db.query.users.findMany({
    where: (fields, { eq }) => eq(fields.id, id),
    columns: {
      id: true,
      name: true,
      contact_phone: true,
      email: true,
    },
    with: {
      addresses: {
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
      comments: {
        columns: {
          comment: true,
        },
      },
      orders: {
        columns: {
          restaurant_id: true,
          // Add other order columns as needed
        },
      },
      restaurant_owners: {
        columns: {
          restaurant_id: true,
          // Add other restaurant_owner columns as needed
        },
      },
      drivers: {
        columns: {
          id: true,
          user_id: true,
          online: true,
          delivering: true,
          // Add other driver columns as needed
        },
      },
    },
  });
};
