import React, { useState } from 'react';

import { AppContext, Screens, UserInfo } from './AppContext';
import { Balance, Game, Menu, Wallet, Farm } from './components';

import './App.css';

const App: React.FC = () => {
    const now = new Date();

    const [screen, setScreen] = useState<Screens>(Screens.home);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        balance: 0,
        remainingGames: 99,
        farmEndTimestamp: now.setHours(now.getHours() + 3   ).valueOf(),
    });

    return (
        <AppContext.Provider value={{ screen, setScreen, userInfo, setUserInfo }}>
            <div className="App">
                <div className="App-header">
                    <Wallet />
                </div>
                <div className="App-body">
                    {screen === Screens.home && (
                        <>
                            <Balance />
                            <Game />
                            <Farm />
                        </>
                    )}
                </div>
                <div className="App-footer">
                    <Menu />
                </div>
            </div>
        </AppContext.Provider>
    );
};

export default App;
