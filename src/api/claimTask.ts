import { fetchPost } from '../utils';

export const URL = 'users/claim-task';

export type ClaimTaskRequest = {
    userId?: number;
    taskId: number;
};

export type ClaimTaskResponse = {
    balance: number;
    claimed: number;
};

export const claimTask = (args: ClaimTaskRequest): Promise<ClaimTaskResponse> => {
    return fetchPost<ClaimTaskRequest, ClaimTaskResponse>(URL, args);
};
