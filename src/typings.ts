export interface UserInfo {
    balance: number;
    remainingGames: number;
    farmEndTimestamp?: number;
}

export type Task = {
    id: string;
    name: string;
    isCompleted: boolean;
    amount: number;
    action: (() => void) | string;
};

export type Friend = {
    id: string;
    name: string;
};
