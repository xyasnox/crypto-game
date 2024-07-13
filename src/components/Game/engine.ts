import {
    BASE_PADDING,
    BIG_FONT_SIZE,
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
    STANDARD_FONT_SIZE,
    TIMER_TIME,
} from './config';
import { Background, EnemyObj, Player, ResourceObj } from './classes';
import { EnemyController, ResourceController } from './controllers';

import { MS_IN_SECOND } from '../../constants';
import { formatTimer } from '../../utils';

export const engine = () => {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Game Objects
    let player: Player;
    let background: Background;

    // Controllers
    let enemyController: EnemyController;
    let resourceController: ResourceController;

    // Variables
    let alive = true;
    let scaleRatio: number;
    let previousTime: number;
    let gameOver: boolean = false;
    let score: number = 0;
    let timer: number = INITIAL_TIMER;

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

    function setScreen() {
        scaleRatio = getScaleRatio();
        canvas.width = GAME_WIDTH * scaleRatio;
        canvas.height = GAME_HEIGHT * scaleRatio;
        createSprites();
    }

    setScreen();

    function getScaleRatio() {
        const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

        const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

        if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
            return screenWidth / GAME_WIDTH;
        } else {
            return screenHeight / GAME_HEIGHT;
        }
    }

    function clearScreen() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function resetGame() {
        if (gameOver) {
            gameOver = false;
            score = 0;
            timer = INITIAL_TIMER;
            alive = true;
        }
    }

    function setupResetGame() {
        window.setTimeout(() => {
            window.addEventListener('keydown', resetGame, { once: true });
            window.addEventListener('touchstart', resetGame, { once: true });
            window.addEventListener('mousedown', resetGame, { once: true });
        }, MS_IN_SECOND);
    }

    function showGameOver() {
        const title = {
            fontSize: BIG_FONT_SIZE * scaleRatio,
            text: 'GAME OVER',
            x: canvas.width / 2,
            y: BASE_PADDING,
        };

        const subtitle = {
            fontSize: STANDARD_FONT_SIZE * scaleRatio,
            text: 'to restart tap on screen',
            x: canvas.width / 2,
            y: BASE_PADDING * 2 + title.fontSize,
        };

        ctx.textBaseline = 'top';
        ctx.fillStyle = 'grey';
        ctx.textAlign = 'center';

        ctx.font = `${title.fontSize}px Karmatic Arcade`;
        ctx.fillText(title.text, title.x, title.y);

        ctx.font = `${subtitle.fontSize}px Karmatic Arcade`;
        ctx.fillText(subtitle.text, subtitle.x, subtitle.y);

        resourceController.reset();
        enemyController.reset();
        setupResetGame();
    }

    function showScore() {
        ctx.font = `${STANDARD_FONT_SIZE * scaleRatio}px Karmatic Arcade`;
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'grey';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${score}`, BASE_PADDING, BASE_PADDING);
    }

    function showTimer() {
        ctx.font = `${STANDARD_FONT_SIZE * scaleRatio}px Karmatic Arcade`;
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'grey';
        ctx.textAlign = 'right';
        const x = canvas.width - BASE_PADDING;
        ctx.fillText(`Time: ${formatTimer(timer)}`, x, BASE_PADDING);
    }

    function gameLoop(currentTime: number) {
        if (previousTime === null) {
            previousTime = currentTime;
            requestAnimationFrame(gameLoop);
            return;
        }
        const frameTimeDelta = currentTime - previousTime;
        previousTime = currentTime;

        clearScreen();

        background.draw();
        player.draw();
        enemyController.draw();
        resourceController.draw();

        if (!gameOver) {
            enemyController.update(GAME_SPEED_START, frameTimeDelta);
            resourceController.update(GAME_SPEED_START, frameTimeDelta);
            player.update(GAME_SPEED_START, frameTimeDelta);
            showScore();
            showTimer();
        }

        const isEnemyHitPlayer = enemyController.checkCollision(player);

        if (!gameOver && (isEnemyHitPlayer || timer <= 0)) {
            if (isEnemyHitPlayer) {
                alive = false;
            }

            gameOver = true;
        }

        if (!gameOver && resourceController.checkCollision(player)) {
            score++;
        }

        if (gameOver) {
            if (!alive) {
                player.die(frameTimeDelta);
            }

            showGameOver();
        }

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);

    function decreaseTimer() {
        timer--;
    }

    (function () {
        window.setInterval(decreaseTimer, TIMER_TIME, { once: true });
    })();

    window.addEventListener('resize', setScreen);
    window.screen.orientation?.addEventListener('change', setScreen);
};
