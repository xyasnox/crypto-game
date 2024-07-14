import { CommonConstructorProps, Position } from '../typings';
import { GRAVITY, JUMP_SPEED, PLAYER_MODEL_HEIGHT, PLAYER_MODEL_WIDTH, WALK_ANIMATION_TIMER } from '../config';

interface PlayerConstructorProps extends CommonConstructorProps {
    width: number;
    height: number;
    minJumpHeight: number;
    maxJumpHeight: number;
    scaleRatio: number;
}

interface PlayerInterface {
    draw(): void;

    update(speed: number, gameSpeed: number, frameTimeDelta: number, scaleRatio: number): void;

    run(gameSpeed: number, frameTime: number): void;

    jump(frameTime: number): void;

    die(frameTime: number): void;
}

export class Player implements PlayerInterface {
    private walkAnimationTimer: number = WALK_ANIMATION_TIMER;
    private frameCounter: number = 0;

    private runImagesArray: HTMLImageElement[] = new Array(3).fill('').map((_, index) => {
        const image = new Image();
        image.src = `../../sprites/astronaut/run/${index + 1}.png`;

        return image;
    });

    private jumpPressed: boolean = false;
    private jumpInProgress: boolean = false;
    private falling: boolean = false;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    position: Position;
    private readonly initialY: number;
    private readonly minJumpHeight: number;
    private readonly maxJumpHeight: number;
    private readonly scaleRatio: number;
    private image: HTMLImageElement;
    private readonly dieImage: HTMLImageElement;

    constructor({ canvas, ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio }: PlayerConstructorProps) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.position = {
            x: 10 * scaleRatio,
            y: canvas.height - this.height - 1.5 * scaleRatio,
        };

        this.initialY = this.position.y;

        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;

        this.scaleRatio = scaleRatio;

        this.image = new Image();
        this.image.src = '../../sprites/astronaut/run/1.png';

        this.dieImage = new Image();
        this.dieImage.src = `../../sprites/astronaut/die/1.png`;

        // Keyboard events
        window.removeEventListener('keydown', this._keydown);
        window.removeEventListener('keyup', this._keyup);

        window.addEventListener('keydown', this._keydown);
        window.addEventListener('keyup', this._keyup);

        // Touch events
        window.removeEventListener('touchstart', this._touchstart);
        window.removeEventListener('touchend', this._touchend);

        window.addEventListener('touchstart', this._touchstart);
        window.addEventListener('touchend', this._touchend);

        // Mouse events
        window.removeEventListener('mousedown', this._touchstart);
        window.removeEventListener('mouseup', this._touchend);

        window.addEventListener('mousedown', this._touchstart);
        window.addEventListener('mouseup', this._touchend);
    }

    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(gameSpeed: number, frameTime: number) {
        this.run(gameSpeed, frameTime);
        this.jump(frameTime);
    }

    run(gameSpeed: number, frameTime: number) {
        this.width = PLAYER_MODEL_WIDTH * this.scaleRatio;

        if (this.walkAnimationTimer <= 0) {
            if (this.frameCounter !== this.runImagesArray.length) {
                this.image = this.runImagesArray[this.frameCounter];
                this.frameCounter++;
            } else {
                this.image = this.runImagesArray[0];
                this.frameCounter = 0;
            }

            this.walkAnimationTimer = WALK_ANIMATION_TIMER;
        }

        this.walkAnimationTimer -= frameTime * gameSpeed;
    }

    jump(frameTime: number) {
        if (this.jumpPressed) {
            this.jumpInProgress = true;
        }

        if (this.jumpInProgress && !this.falling) {
            if (
                this.position.y > this.canvas.height - this.minJumpHeight ||
                (this.position.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)
            ) {
                this.position.y -= JUMP_SPEED * frameTime * this.scaleRatio;
            } else {
                this.falling = true;
            }
        } else {
            if (this.position.y < this.initialY) {
                this.position.y += GRAVITY * frameTime * this.scaleRatio;
                if (this.position.y + this.height > this.canvas.height) {
                    this.position.y = this.initialY;
                }
            } else {
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    die(frameTime: number) {
        this.image = this.dieImage;
        this.width = PLAYER_MODEL_HEIGHT * this.scaleRatio;
        this.height = PLAYER_MODEL_WIDTH * this.scaleRatio;

        if (this.position.y < this.initialY) {
            this.position.y += GRAVITY * frameTime * this.scaleRatio;

            if (this.position.y + this.height > this.canvas.height) {
                this.position.y = this.initialY;
            }
        }
    }

    private _keydown = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
            this.jumpPressed = true;
        }
    };

    private _keyup = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
            this.jumpPressed = false;
        }
    };

    private _touchstart = () => {
        this.jumpPressed = true;
    };

    private _touchend = () => {
        this.jumpPressed = false;
    };
}
