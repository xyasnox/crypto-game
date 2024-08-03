import React, { useEffect, useLayoutEffect, useState } from 'react';

import { getFriends, getOrCreate } from './api';
import AppContext, { Screens } from './context/AppContext';
import ThemeContext, { themeConverter, Themes } from './context/ThemeContext';
import { ToastContextProvider } from './context/ToastContext';
import { Balance, Farm, FriendList, Game, GameWidget, Menu, TaskList, ThemeToggle } from './components';
import { Friend, InitialUserInfo, Task } from './typings';
import { Loader } from './ui';

import './Root.css';

const Root: React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [screen, setScreen] = useState<Screens>(Screens.home);
    const [theme, setTheme] = useState<Themes>(Themes.light);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [userInfo, setUserInfo] = useState<InitialUserInfo>({
        userId: 0,
        balance: 0,
        remainingGames: 0,
    });

    useLayoutEffect(() => {
        const webApp = window.Telegram.WebApp;
        const theme = themeConverter(webApp.colorScheme);

        const user = window.Telegram.WebApp.initDataUnsafe.user;

        const accountId: number | undefined = user?.id;
        const fullName: string = user ? `${user.first_name} ${user.last_name}` : '';
        const login: string = user?.username || '';
        const invitedBy = new URLSearchParams(window.location.search).get('invitedBy');

        webApp.disableVerticalSwipes();

        getOrCreate({ accountId, fullName, login, invitedBy: invitedBy ? Number(invitedBy) : null }).then(
            ({ tasks, userInfo }) => {
                setTasks(tasks);
                setUserInfo({ ...userInfo, userId: userInfo.id });
                setLoading(false);
            },
        );
        getFriends({ accountId, limit: 10, offset: 0 }).then(({ friends }) => setFriends(friends));
        setTheme(theme);
    }, []);

    useEffect(() => {
        const container = document.getElementsByTagName('html')[0];

        container.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <AppContext.Provider
                value={{
                    screen,
                    setScreen,
                    userInfo,
                    setUserInfo,
                    tasks,
                    setTasks,
                    friends,
                    setFriends,
                }}
            >
                <ToastContextProvider>
                    {isLoading ? (
                        <div className="App-loading">
                            <Loader />
                        </div>
                    ) : (
                        <div className="App">
                            <div className="App-header">
                                {/* <Wallet /> */}
                                <ThemeToggle />
                            </div>
                            <div className="App-body">
                                {screen === Screens.home && (
                                    <>
                                        <Balance />
                                        <GameWidget />
                                        <Farm />
                                    </>
                                )}
                                {screen === Screens.tasks && <TaskList />}
                                {screen === Screens.frens && <FriendList />}
                            </div>
                            <div className="App-footer">
                                <Menu />
                            </div>
                            {screen === Screens.game && <Game />}
                        </div>
                    )}
                </ToastContextProvider>
            </AppContext.Provider>
        </ThemeContext.Provider>
    );
};

export default Root;
