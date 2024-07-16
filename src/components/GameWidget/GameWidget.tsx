import React, { useContext } from 'react';

import { CardIcon } from '../../assets';
import AppContext, { AppContextType, Screens } from '../../context/AppContext';
import ToastContext, { ToastContextType } from '../../context/ToastContext';
import { Button } from '../../ui';

import './GameWidget.css';

export const GameWidget: React.FC = () => {
    const {
        userInfo: { remainingGames },
        setUserInfo,
        setScreen,
    } = useContext<AppContextType>(AppContext);
    const { setToast } = useContext<ToastContextType>(ToastContext);

    return (
        <div className="Widget-container">
            <span className="Widget-text">
                <CardIcon className="Widget-icon" />
                {remainingGames}
            </span>
            <Button
                onClick={() => {
                    if (remainingGames > 0) {
                        setUserInfo((prevState) => ({
                            ...prevState,
                            remainingGames: prevState.remainingGames - 1,
                        }));
                        setScreen(Screens.game);
                        return;
                    }
                    
                    setToast({ value: 'No more bills', type: 'error' });
                }}
            >
                Start
            </Button>
        </div>
    );
};
