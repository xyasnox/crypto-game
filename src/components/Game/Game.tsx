import React, { MouseEventHandler, useContext, useEffect, useState } from 'react';

import { CloseIcon } from '../../assets';
import AppContext, { AppContextType, Screens } from '../../context/AppContext';
import { formatGameTimer, getScaleRatio } from '../../utils';
import { Button } from '../../ui';
import { claim } from '../../api';

import {
    COIN_CONFIG,
    ENEMY_CONFIG,
    GAME_HEIGHT,
    GAME_SPEED_START,
    GAME_WIDTH,
    INITIAL_GAME_STATE,
    INITIAL_TIMER,
    MAX_JUMP_HEIGHT,
    MIN_JUMP_HEIGHT,
    OBJECT_SPEED,
    PLAYER_MODEL_HEIGHT,
    PLAYER_MODEL_WIDTH,
    TIMER_TIME,
} from './config';
import { EnemyController, ResourceController } from './controllers';
import { Background, EnemyObj, Player, ResourceObj } from './classes';

import './Game.css';
import { useToastContext } from '../../context/ToastContext';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

// GamePast Objects
let player: Player;
let background: Background;

// Controllers
let enemyController: EnemyController;
let resourceController: ResourceController;

// Variables
let scaleRatio: number;
let previousTime: number | null = null;

// Game info
let timer = INITIAL_TIMER;
let isPlayerAlive = true;
let isGameOver = false;

let isActive = false;

interface GameInfo {
    score: number;
    isGameOver: boolean;
    isPlayerAlive: boolean;
}

function setCanvasProps() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;

    createSprites();
}

function createSprites() {
    const playerWidthInGame = PLAYER_MODEL_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_MODEL_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

    player = new Player({
        width: playerWidthInGame,
        height: playerHeightInGame,
        minJumpHeight: minJumpHeightInGame,
        maxJumpHeight: maxJumpHeightInGame,
        scaleRatio,
        canvas,
        ctx,
    });

    background = new Background({ scaleRatio, canvas, ctx });

    const enemies: EnemyObj[] = ENEMY_CONFIG.map((enemy) => {
        const image = new Image();
        image.src = enemy.image;

        return {
            image,
            minY: enemy.minY * scaleRatio,
            maxY: enemy.maxY * scaleRatio,
            width: enemy.width * scaleRatio,
            height: enemy.height * scaleRatio,
        };
    });

    const coin: ResourceObj = {
        minY: COIN_CONFIG.minY * scaleRatio,
        maxY: COIN_CONFIG.maxY * scaleRatio,
        width: COIN_CONFIG.width * scaleRatio,
        height: COIN_CONFIG.height * scaleRatio,
        imageSrc: COIN_CONFIG.image,
        hiddenImageSrc: COIN_CONFIG.hidden,
    };

    enemyController = new EnemyController({
        items: enemies,
        scaleRatio,
        speed: OBJECT_SPEED,
        canvas,
        ctx,
    });

    resourceController = new ResourceController({
        source: coin,
        scaleRatio,
        speed: OBJECT_SPEED,
        canvas,
        ctx,
    });
}

export const Game: React.FC = () => {
    const {
        screen,
        setScreen,
        userInfo: { userId },
        setUserInfo,
    } = useContext<AppContextType>(AppContext);
    const { triggerToast } = useToastContext();

    const [gameInfo, setGameInfo] = useState<GameInfo>({
        score: 0,
        isGameOver: false,
        isPlayerAlive: true,
    });

    const handleSetInitialVars = () => {
        setGameInfo(INITIAL_GAME_STATE);

        timer = INITIAL_TIMER;
        isPlayerAlive = true;
        isGameOver = false;
    };

    const freeze = () => {
        isActive = false;
    };

    useEffect(() => {
        canvas = document.getElementById('game') as HTMLCanvasElement;
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        setCanvasProps();

        const render = (currentTime?: number) => {
            if (!isActive) return;

            if (!currentTime) {
                requestAnimationFrame(render);
                return;
            }

            if (previousTime === null) {
                previousTime = currentTime;
                requestAnimationFrame(render);
                return;
            }

            const frameTimeDelta = currentTime - previousTime;
            previousTime = currentTime;

            background.draw();
            player.draw();
            enemyController.draw();
            resourceController.draw();

            if (!isGameOver && isActive) {
                enemyController.update(GAME_SPEED_START, frameTimeDelta);
                resourceController.update(GAME_SPEED_START, frameTimeDelta);
                player.update(GAME_SPEED_START, frameTimeDelta);
                background.update(GAME_SPEED_START, frameTimeDelta, scaleRatio);
            }

            const isEnemyHitPlayer = enemyController.checkCollision(player);

            if (!isGameOver && (isEnemyHitPlayer || timer <= 0) && isActive) {
                if (isEnemyHitPlayer) {
                    isPlayerAlive = true;
                }
                isGameOver = true;

                setGameInfo((prevState) => ({
                    ...prevState,
                    isPlayerAlive: !isEnemyHitPlayer,
                    isGameOver: true,
                }));
                timer = 0;
            }

            if (!isGameOver && resourceController.checkCollision(player) && isActive) {
                setGameInfo((prevState) => ({
                    ...prevState,
                    score: ++prevState.score,
                }));
            }

            if (isGameOver) {
                if (!isPlayerAlive) {
                    player.die(frameTimeDelta);
                }

                resourceController?.reset();
                enemyController?.reset();
            }

            requestAnimationFrame(render);
        };

        render();
    }, []);

    useEffect(() => {
        if (screen === Screens.game) {
            isActive = true;
        }
    }, [screen]);

    useEffect(() => {
        window.addEventListener('resize', setCanvasProps);
        window.screen.orientation?.addEventListener('change', setCanvasProps);
    }, []);

    useEffect(() => {
        const timerID = setInterval(() => --timer, TIMER_TIME);

        if (timer <= 0) {
            clearInterval(timerID);
        }

        return () => clearInterval(timerID);
    }, []);

    const handleClaimCoins: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        event.preventDefault();

        claim({ userId, reward: gameInfo.score }).then(({ balance, claimed }) => {
            setUserInfo((prevState) => ({ ...prevState, balance }));
            triggerToast(`Collected ${claimed}`);
        });
        freeze();
        handleSetInitialVars();
        setScreen(Screens.home);
    };

    return (
        <div className="Game-container">
            <div className="Game-hood">
                <div className="Game-score">Score: {gameInfo.score}</div>
                <div className="Game-timer">Time: {formatGameTimer(timer)}</div>
                <canvas id="game" className="Game-canvas" />
                {gameInfo.isGameOver && (
                    <div className="Game-over">
                        <span>Well done: {gameInfo.score} collected!</span>
                        <Button onClick={handleClaimCoins} reversed>
                            Claim
                        </Button>
                    </div>
                )}
                <div className="Game-faq">
                    <span>Tap or press "Space" to jump</span>
                    <span>longer = higher</span>
                </div>
            </div>
            <CloseIcon
                className="Game-closeIcon"
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();

                    freeze();
                    handleSetInitialVars();
                    setScreen(Screens.home);
                }}
            />
        </div>
    );
};
