import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIState, TSState, state,city } from "../drizzle/schema";

export const listCitiesInState = async (stateId: TSState['id']): Promise<any[]> => {
    return db.select({
        city: {
            id: city.id,
            name: city.name,
        }
    })
        .from(city)
        .innerJoin(state, eq(city.state_id, state.id)) // Join city table with state table
        .where(eq(state.id, stateId)); // Filter by state ID
};

export const listStatesService = async (limit?: number): Promise<TSState[] | null> => {
    if (limit) {
        return await db.query.state.findMany({
            limit: limit
        });
    }
    return await db.query.state.findMany();
};


export async function getStateService(id: TSState['id']): Promise<Array<TSState>> {
    return db.select().from(state).where(eq(state.id, id));
};

export const createStateService = async (stateData: TIState) => {
    await db.insert(state).values(stateData);
    return "State created successfully";
};

export const updateStateService = async (id: number, stateData: TIState) => {
    await db.update(state).set(stateData).where(eq(state.id, id));
    return "State updated successfully";
};

export const deleteStateService = async (id: number) => {
    await db.delete(state).where(eq(state.id, id));
    return "State deleted successfully";
};
