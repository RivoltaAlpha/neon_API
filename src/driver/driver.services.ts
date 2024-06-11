import db from "../drizzle/db";
import { TIDriver, TSDriver, driver } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const listService = async (limit?: number): Promise<TSDriver[] | null> => {
    if (limit) {
        return await db.query.driver.findMany({
            limit: limit
        });
    }
    return await db.query.driver.findMany();
};

export async function  getDriverService(id: TSDriver['id']): Promise<Array<TSDriver>> {
    return db.select().from(driver).where(eq(driver.id, id));
};

export const createDriverService = async (driverData: TIDriver) => {
    await db.insert(driver).values(driverData);
    return "Driver created successfully";
};

export const updateDriverService = async (id: number, driverData: TIDriver) => {
    await db.update(driver).set(driverData).where(eq(driver.id, id));
    return "Driver updated successfully";
};

export const deleteDriverService = async (id: number) => {
    await db.delete(driver).where(eq(driver.id, id));
    return "Driver deleted successfully";
};
