export type CollectRequest = {
    accountId: number;
};

export type CollectResponse = {
    earned: number;
};

export const collectFarm = (args: CollectRequest): Promise<CollectResponse> => {
    return Promise.resolve({ earned: 50 });
};
