import React, { useContext, useEffect, useState } from 'react';

import { CloseIcon, RetryIcon } from '../../assets';
import AppContext, { AppContextType, Screens } from '../../context/AppContext';
import { getScaleRatio } from '../../utils';

import {
    COIN_CONFIG,
    ENEMY_CONFIG,
    GAME_HEIGHT,
    GAME_SPEED_START,
    GAME_WIDTH,
    INITIAL_TIMER,
    MAX_JUMP_HEIGHT,
    MIN_JUMP_HEIGHT,
    OBJECT_SPEED,
    PLAYER_MODEL_HEIGHT,
    PLAYER_MODEL_WIDTH,
    TIMER_TIME,
} from './config';
import { EnemyController, ResourceController } from './controllers';
import { showScore, showTimer } from './engine';
import { Background, EnemyObj, Player, ResourceObj } from './classes';

import './Game.css';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

// Game Objects
let player: Player;
let background: Background;

// Controllers
let enemyController: EnemyController;
let resourceController: ResourceController;

// Variables
let scaleRatio: number;
let previousTime: number | null = null;

let score: number = 0;
let timer: number = INITIAL_TIMER;
let isPlayerAlive = true;
let isGameOver: boolean = false;

function setInitialVars() {
    score = 0;
    timer = INITIAL_TIMER;
    isPlayerAlive = true;
    isGameOver = false;
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

const render = (currentTime?: number) => {
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

    if (!isGameOver) {
        enemyController.update(GAME_SPEED_START, frameTimeDelta);
        resourceController.update(GAME_SPEED_START, frameTimeDelta);
        player.update(GAME_SPEED_START, frameTimeDelta);
        background.update(GAME_SPEED_START, frameTimeDelta, scaleRatio);

        showScore(score, { ctx, canvas, scaleRatio });
        showTimer(timer, { ctx, canvas, scaleRatio });
    }

    const isEnemyHitPlayer = enemyController.checkCollision(player);

    if (!isGameOver && (isEnemyHitPlayer || timer <= 0)) {
        if (isEnemyHitPlayer) {
            isPlayerAlive = false;
        }
        isGameOver = true;
    }

    if (!isGameOver && resourceController.checkCollision(player)) {
        score++;
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

export const Game = () => {
    const { setScreen, userInfo, setUserInfo } = useContext<AppContextType>(AppContext);

    const [isGameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
        canvas = document.getElementById('game') as HTMLCanvasElement;
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        setCanvasProps();

        render();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', setCanvasProps);
        window.screen.orientation?.addEventListener('change', setCanvasProps);
    }, []);

    useEffect(() => {
        const timerID = setInterval(() => timer--, TIMER_TIME);

        return () => clearInterval(timerID);
    }, []);

    return (
        <div className="Game-container">
            <canvas id="game" className="Game-canvas" />
            {isGameOver && <span className="Game-over">Game is over, but... Retry? <RetryIcon /> </span>}
            <CloseIcon
                className="Game-closeIcon"
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();

                    setInitialVars();
                    setScreen(Screens.home);
                }}
            />
        </div>
    );
};
