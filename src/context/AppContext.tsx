import React, { Dispatch, SetStateAction } from 'react';

import { Friend, Task, UserInfo } from '../typings';

export enum Screens {
    home = 'home',
    tasks = 'tasks',
    frens = 'frens',
    game = 'game',
}

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
        userId: 0,
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
