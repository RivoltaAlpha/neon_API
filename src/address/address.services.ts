import db from "../drizzle/db";
import { TIAddress, TSAddress, address } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const listService = async (limit?: number): Promise<TSAddress[] | null> => {
    if (limit) {
        return await db.query.address.findMany({
            limit: limit
        });
    }
    return await db.query.address.findMany();
};

export async function  getAddressService(id: TSAddress['id']): Promise<Array<TSAddress>> {
    return db.select().from(address).where(eq(address.id, id));
};

export const createAddressService = async (addressData: TIAddress) => {
    await db.insert(address).values(addressData);
    return "Address created successfully";
};

export const updateAddressService = async (id: number, addressData: TIAddress) => {
    await db.update(address).set(addressData).where(eq(address.id, id));
    return "Address updated successfully";
};

export const deleteAddressService = async (id: number) => {
    await db.delete(address).where(eq(address.id, id));
    return "Address deleted successfully";
};
