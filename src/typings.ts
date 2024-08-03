export interface UserInfo {
    // userId from base
    id: number;
    balance: number;
    remainingGames: number;
    farmEndTimestamp?: number;
}

export interface InitialUserInfo extends Omit<UserInfo, 'id'> {
    accountId?: number;
    userId: number;
}

export enum TaskStatus {
    Completed,
    Active,
}

export type Task = {
    id: number;
    name: string;
    status: TaskStatus;
    reward: number;
};

export type Friend = {
    accountId: number;
    name: string;
};
