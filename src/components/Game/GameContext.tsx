import React, { Dispatch, SetStateAction } from 'react';
import { GameInfo } from './typings';
import { INITIAL_TIMER } from './config';

interface ContextValue {
    gameInfo: GameInfo;
    setGameInfo: Dispatch<SetStateAction<GameInfo>>;
    canvas?: HTMLCanvasElement | null;
    ctx?: CanvasRenderingContext2D | null;
}

export const INITIAL_GAME_STATE = {
    isGameOver: false,
    timer: INITIAL_TIMER,
    score: 0,
    isPlayerAlive: true,
};

export const GameContext = React.createContext<ContextValue>({
    gameInfo: INITIAL_GAME_STATE,
    setGameInfo: () => null,
});
