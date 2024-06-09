import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIState, TSState, state } from "../drizzle/schema";

export const getStateService = async (id: number): Promise<TSState | undefined> => {
    return await db.query.state.findFirst({
        where: eq(state.id, id)
    });
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
