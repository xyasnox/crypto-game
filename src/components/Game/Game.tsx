import React, { useContext, useEffect, useState } from 'react';
import { engine } from './engine';

import './Game.css';
import { CardIcon } from '../../assets';
import { AppContext } from '../../AppContext';

export const Game: React.FC = () => {
    const [isGameStarted, setGameStarted] = useState<boolean>(false);
    const {
        userInfo: { remainingGames },
    } = useContext(AppContext);

    if (isGameStarted) return <canvas id="game" />;

    return (
        <div className="Game-container">
            <span className="Game-text">
                <CardIcon className="Game-icon" />
                {remainingGames}
            </span>
            <button className="Game-button" onClick={() => setGameStarted(true)}>
                Start
            </button>
        </div>
    );
};
