import React, { Dispatch, SetStateAction } from 'react';

export interface GameInfo {
    score: number;
    isGameOver: boolean;
    isPlayerAlive: boolean;
}

export interface GameContextType {
    gameInfo: GameInfo;
    setGameInfo: Dispatch<SetStateAction<GameInfo>>;
}

export const INITIAL_GAME_STATE = {
    score: 0,
    isGameOver: false,
    isPlayerAlive: true,
};

const GameContext = React.createContext<GameContextType>({
    gameInfo: INITIAL_GAME_STATE,
    setGameInfo: () => null,
});

export default GameContext;
