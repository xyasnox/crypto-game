import React, { Dispatch, SetStateAction } from 'react';

interface ContextValue {
    screen: Screens;
    setScreen: Dispatch<SetStateAction<Screens>>;
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}

export enum Screens {
    home = 'home',
    tasks = 'tasks',
    frens = 'frens',
}

export interface UserInfo {
    balance: number;
    remainingGames: number;
    farmEndTimestamp?: number;
}

export const AppContext = React.createContext<ContextValue>({
    screen: Screens.home,
    setScreen: () => null,
    userInfo: {
        balance: 0,
        remainingGames: 0,
    },
    setUserInfo: () => null,
});
