import React, { useEffect, useLayoutEffect, useState } from 'react';

import { initState } from './api';
import AppContext, { Screens } from './context/AppContext';
import ThemeContext, { themeConverter, Themes } from './context/ThemeContext';
import { Balance, Farm, FriendList, Game, GameWidget, Menu, TaskList, ThemeToggle } from './components';
import { Friend, Task, UserInfo } from './typings';
import { Loader } from './ui';

import './Root.css';

const Root: React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(true);

    const [screen, setScreen] = useState<Screens>(Screens.home);
    const [theme, setTheme] = useState<Themes>(Themes.light);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        balance: 0,
        remainingGames: 0,
    });

    useLayoutEffect(() => {
        const webApp = window.Telegram.WebApp;
        const theme = themeConverter(webApp.colorScheme);

        initState({ accountId: 1234 }).then(({ tasks, friends, userInfo }) => {
            setFriends(friends);
            setTasks(tasks);
            setUserInfo(userInfo);
            setLoading(false);
        });
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
                    screen, setScreen, userInfo, setUserInfo, tasks, setTasks, friends, setFriends
                }}
            >
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
            </AppContext.Provider>
        </ThemeContext.Provider>
    );
};

export default Root;
