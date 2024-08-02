import { Friend } from '../typings';
import { fetchPost } from '../utils';

export const URL = 'users/friend/query';

export type FriendsRequest = {
    accountId?: number;
    userId?: number;
    limit: number;
    offset: number;
};

export type FriendsResponse = {
    friends: Friend[];
    totalCount: number;
};

export const getFriends = (args: FriendsRequest): Promise<FriendsResponse> => {
    return fetchPost<FriendsRequest, FriendsResponse>(URL, args);
};
