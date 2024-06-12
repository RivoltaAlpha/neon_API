import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrder, TSOrder, orders, comment, driver, address, order_status, users, order_menu_item } from "../drizzle/schema";

export const listService = async (limit?: number): Promise<TSOrder[] | null> => {
    if (limit) {
        return await db.query.orders.findMany({
            limit: limit
        });
    }
    return await db.query.orders.findMany();
};

// List all orders with related details
export const listOtherAssociatedServices = async (limit?: number): Promise<any[]> => {
    const query = db.select()
        .from(orders)
        .leftJoin(comment, eq(orders.id, comment.order_id)) // Might not have comments
        .innerJoin(driver, eq(orders.driver_id, driver.id)) // Each order should have a driver
        .innerJoin(address, eq(orders.delivery_address_id, address.id)) // Each order should have an address
        .innerJoin(users, eq(orders.user_id, users.id)) // Each order should have a user

    if (limit) {
        query.limit(limit);
    }

    return query;
};


export async function getOrderService(id: TSOrder['id']): Promise<Array<TSOrder>> {
    return db.select().from(orders).where(eq(orders.id, id));
}

export const createOrderService = async (orderData: TIOrder) => {

    await db.insert(orders).values(orderData)
    return "Order created successfully";
}

export const updateOrderService = async (id: number, orderData: TIOrder) => {
    await db.update(orders).set(orderData).where(eq(orders.id, id))
    return "Order updated successfully";
}

export const deleteOrderService = async (id: number) => {
    await db.delete(orders).where(eq(orders.id, id))
    return "Order deleted successfully";
}
// Additional services to get related data
export const getOrderComments = async (orderId: TSOrder['id']): Promise<any[]> => {
    return db.select({
        orderId: orders.id, // Include order ID
        comment: {
            id: comment.id,
            user: users.name,
            text: comment.comment
        },
        user: {
            id: users.id,
            name: users.name,
            email: users.email,
            contact_phone: users.contact_phone
        },
    })
    .from(comment)
    .innerJoin(users, eq(users.id, comment.user_id))
    .innerJoin(orders, eq(orders.id, comment.order_id))
    .where(eq(comment.order_id, orderId));
};


export const getOrderDriver = async (orderId: TSOrder['id']): Promise<any[]> => {
    return db.select({
        driver: {
        Driver_id: driver.id,
        User_being_delivered_to: users.name,
        Available: driver.online,
        contact: driver.delivering
        },
        orders:{
            id: orders.id,
            order_Delivery: orders.delivery_address_id
        }
    })
        .from(orders)
        .innerJoin(driver, eq(orders.driver_id, driver.id))
        .innerJoin(users, eq(orders.user_id, users.id))
        .where(eq(orders.id, orderId));
}

export const getOrderAddress = async (orderId: TSOrder['id']): Promise<any[]> => {
    return db.select({
        orders:{
            id: orders.id,
            restaurant_id:orders.restaurant_id,
            order_delivery: orders.driver_id,
            order_Address: orders.delivery_address_id
        },
        address: {
        id: address.id,
        user_id: address.user_id,
        city_id: address.city_id,
        zip_code:address.zip_code,
        Instructions:address.delivery_instructions
        }
    })
        .from(orders)
        .innerJoin(address, eq(orders.delivery_address_id, address.id))
        .where(eq(orders.id, orderId));
}

export const getOrderUser = async (orderId: TSOrder['id']): Promise<any[]> => {
    return db.select({
        user: {
        id: users.id,
        name: users.name,
        email: users.email,
        contact_phone: users.contact_phone
        },
        orders:{
            id: orders.id,
            restaurant_id:orders.restaurant_id,
            order_delivery: orders.driver_id,
            order_date: orders.delivery_address_id
        }
    })
        .from(orders)
        .innerJoin(users, eq(orders.user_id, users.id))
        .where(eq(orders.id, orderId));

}


