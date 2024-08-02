import React, { useContext } from 'react';

import { CardIcon } from '../../assets';
import AppContext, { AppContextType, Screens } from '../../context/AppContext';
import { Button } from '../../ui';

import './GameWidget.css';

export const GameWidget: React.FC = () => {
    const {
        userInfo: { remainingGames },
        setUserInfo,
        setScreen,
    } = useContext<AppContextType>(AppContext);

    return (
        <div className="Widget-container">
            <span className="Widget-text">
                <CardIcon className="Widget-icon" />
                Games: {remainingGames}
            </span>
            <Button
                disabled={remainingGames <= 0}
                onClick={() => {
                    setUserInfo((prevState) => ({
                        ...prevState,
                        remainingGames: prevState.remainingGames - 1,
                    }));
                    setScreen(Screens.game);
                }}
            >
                Start
            </Button>
        </div>
    );
};
