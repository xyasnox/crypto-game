export type ClaimRequest = {
    accountId: number;
    claimed: number;
};

export type ClaimResponse = {
    earned: number;
};

export const claimCoins = (args: ClaimRequest): Promise<ClaimResponse> => {
    return Promise.resolve({ earned: args.claimed });
};
