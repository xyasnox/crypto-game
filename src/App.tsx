import React, { useEffect, useState } from 'react';
import { v6 as uuid } from 'uuid';

import AppContext, { Screens, Task, UserInfo } from './context/AppContext';
import GameContext, { GameInfo } from './context/GameContext';
import ThemeContext, { Themes } from './context/ThemeContext';
import { Balance, Farm, Game, GameWidget, Menu, TaskList, ThemeToggle } from './components';

import './App.css';

const App: React.FC = () => {
    const now = new Date();

    const [screen, setScreen] = useState<Screens>(Screens.home);
    const [theme, setTheme] = useState<Themes>(Themes.light);
    const [tasks, setTasks] = useState<Task[]>([
        {
            name: 'Connect wallet',
            id: uuid(),
            amount: 100,
            isCompleted: true,
            action: () => {},
        },
        { name: 'follow twitter', id: uuid(), amount: 100, isCompleted: false, action: 'https://x.com/xyasnox' },
    ]);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        balance: 0,
        remainingGames: 99,
        farmEndTimestamp: now.setSeconds(now.getSeconds() + 10).valueOf(),
    });
    const [gameInfo, setGameInfo] = useState<GameInfo>({
        score: 0,
        isGameOver: false,
        isPlayerAlive: true,
    });

    useEffect(() => {
        const container = document.getElementsByTagName('html')[0];

        container.setAttribute('data-theme', theme);
    }, [theme]);

    console.log(gameInfo);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <AppContext.Provider value={{ screen, setScreen, userInfo, setUserInfo, tasks, setTasks }}>
                {screen === Screens.game ? (
                    <GameContext.Provider value={{ gameInfo, setGameInfo }}>
                        <Game />
                    </GameContext.Provider>
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
                            {screen === Screens.frens && <></>}
                        </div>
                        <div className="App-footer">
                            <Menu />
                        </div>
                    </div>
                )}
            </AppContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;
