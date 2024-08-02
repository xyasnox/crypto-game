export interface UserInfo {
    accountId?: number;
    userId: number;
    balance: number;
    remainingGames: number;
    farmEndTimestamp?: number;
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
