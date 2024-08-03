import { Task, UserInfo } from '../typings';
import { fetchPost } from '../utils';

const URL: string = 'users/get-or-create';

export type GetOrCreateRequest = {
    accountId?: number;
    login: string;
    fullName: string;
    invitedBy?: number | null;
};

export type GetOrCreateResponse = {
    userInfo: UserInfo;
    tasks: Task[];
};

export const getOrCreate = (args: GetOrCreateRequest): Promise<GetOrCreateResponse> => {
    return fetchPost<GetOrCreateRequest, GetOrCreateResponse>(URL, args);
};
