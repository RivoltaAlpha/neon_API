import { eq } from "drizzle-orm";
import  db  from '../drizzle/db';
import { TIStatus, TSStatus, status_catalog} from "../drizzle/schema";

export const listScService = async (limit?: number): Promise<TSStatus[] | null> => {
    if (limit) {
        return await db.query.status_catalog.findMany({
            limit: limit
        });
    }
    return await db.query.status_catalog.findMany();
};

export async function getServiceCatalog(id: TSStatus['id']): Promise<Array<TSStatus>> {
    return db.select().from(status_catalog).where(eq(status_catalog.id, id));
};

export const createServiceCatalog = async (data:TIStatus) => {
    await db.insert(status_catalog).values(data);
    return "State created successfully";
};

export const updateServiceCatalog = async (id: number, data:TIStatus) => {
    await db.update(status_catalog).set(data).where(eq(status_catalog.id, id));
    return "State updated successfully";
};

export const deleteStatusCatalog = async (id: number) => {
    await db.delete(status_catalog).where(eq(status_catalog.id, id));
    return "Status catalog successfully deleted"
};
