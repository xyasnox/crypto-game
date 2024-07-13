import { FARM_TIME_HOURS } from '../config';

export type UpdateRequest = {
    accountId: number;
};

export type UpdateResponse = {
    farmEndTimestamp: number;
};

export const updateFarmTimestamp = (args: UpdateRequest): Promise<UpdateResponse> => {
    const now = new Date();

    return Promise.resolve({ farmEndTimestamp: now.setHours(now.getHours() + FARM_TIME_HOURS) });
};
