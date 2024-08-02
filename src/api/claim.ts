import { fetchPost } from '../utils';

export const URL = 'users/claim';

export type ClaimRequest = {
    userId: number;
    reward: number;
};

export type ClaimResponse = {
    balance: number;
    claimed: number;
};

export const claim = (args: ClaimRequest): Promise<ClaimResponse> => {
    return fetchPost<ClaimRequest, ClaimResponse>(URL, args);
};
