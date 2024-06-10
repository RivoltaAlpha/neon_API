import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICity, TSCity, city } from "../drizzle/schema";

export const listCityService = async (limit?: number): Promise<TSCity[] | null> => {
    if (limit) {
        return await db.query.city.findMany({
            limit: limit
        });
    }
    return await db.query.city.findMany();
};

export async function  getCityService(id: TSCity['id']): Promise<Array<TSCity>> {
    return db.select().from(city).where(eq(city.id, id));
};
export const createCityService = async (cityData: TICity) => {
    await db.insert(city).values(cityData)
    return "City created successfully";
}

export const updateCityService = async (id: number, cityData: TICity) => {
    await db.update(city).set(cityData).where(eq(city.id, id))
    return "City updated successfully";
}

export const deleteCityService = async (id: number) => {
    await db.delete(city).where(eq(city.id, id))
    return "City deleted successfully";
}
