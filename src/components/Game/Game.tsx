import React, { useContext, useState } from 'react';
import { engine } from './engine';

import { CardIcon, CloseIcon } from '../../assets';
import AppContext, { AppContextType } from '../../context/AppContext';
import { Button } from '../../ui';

import './Game.css';

export const Game: React.FC = () => {
    const [isGameStarted, setGameStarted] = useState<boolean>(false);
    const {
        userInfo: { remainingGames },
        setUserInfo,
    } = useContext<AppContextType>(AppContext);

    return (
        <div className="Game-container">
            {isGameStarted ? (
                <>
                    <canvas id="game" />
                    <CloseIcon
                        className="Game-closeIcon"
                        onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();

                            setGameStarted(false);
                        }}
                    />
                </>
            ) : (
                <>
                    <span className="Game-text">
                        <CardIcon className="Game-icon" />
                        {remainingGames}
                    </span>
                    <Button
                        onClick={() => {
                            setUserInfo((prevState) => ({ ...prevState, remainingGames: --prevState.remainingGames }));
                            setGameStarted(true);
                        }}
                    >
                        Start
                    </Button>
                </>
            )}
        </div>
    );
};
