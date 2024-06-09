import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICity, TSCity, city } from "../drizzle/schema";

export const getCityService = async (id: number): Promise<TSCity | undefined> => {
    return await db.query.city.findFirst({
        where: eq(city.id, id)
    })
}

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
