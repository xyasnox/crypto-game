import React, { Dispatch, SetStateAction } from 'react';

export enum Screens {
    home = 'home',
    tasks = 'tasks',
    frens = 'frens',
    game = 'game',
}

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

export interface AppContextType {
    screen: Screens;
    setScreen: Dispatch<SetStateAction<Screens>>;
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
    friends: Friend[];
    setFriends: Dispatch<SetStateAction<Friend[]>>;
}

const AppContext = React.createContext<AppContextType>({
    screen: Screens.home,
    setScreen: () => null,
    userInfo: {
        balance: 0,
        remainingGames: 0,
    },
    setUserInfo: () => null,
    tasks: [],
    setTasks: () => [],
    friends: [],
    setFriends: () => [],
});

export default AppContext;
