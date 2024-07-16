export type CollectRequest = {
    accountId: number;
    claimed: number;
};

export type CollectResponse = {
    earned: number;
};

export const claimCoins = (args: CollectRequest): Promise<CollectResponse> => {
    return Promise.resolve({ earned: args.claimed });
};
