import { Enemy, EnemyObj, Player } from '../classes';
import { CommonConstructorProps } from '../typings';
import { getRandomNumber } from '../../../utils';
import { ENEMY_INTERVAL_MAX, ENEMY_INTERVAL_MIN } from '../config';

interface EnemyControllerInterface {
    setNextShowTime(): void;
    createEnemySprite(): void;
    draw(): void;
    checkCollision(sprite: Player): void;
    reset(): void;
}

interface EnemyControllerConstructor extends CommonConstructorProps {
    items: EnemyObj[];
    scaleRatio: number;
    speed: number;
}

export class EnemyController implements EnemyControllerInterface {
    queue: Enemy[] = [];

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private interval: number;
    private readonly items: EnemyObj[];
    private readonly scaleRatio: number;
    private readonly speed: number;

    constructor({ canvas, ctx, items, scaleRatio, speed }: EnemyControllerConstructor) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.interval = 0;
        this.items = items;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextShowTime();
    }

    setNextShowTime() {
        this.interval = getRandomNumber(ENEMY_INTERVAL_MIN, ENEMY_INTERVAL_MAX);
    }

    createEnemySprite() {
        const index = getRandomNumber(0, this.items.length - 1);

        const enemyObject = this.items[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - enemyObject.height - getRandomNumber(enemyObject.minY, enemyObject.maxY);

        const enemy = new Enemy({
            canvas: this.canvas,
            ctx: this.ctx,
            position: {
                x,
                y,
            },
            width: enemyObject.width,
            height: enemyObject.height,
            image: enemyObject.image,
        });

        this.queue.push(enemy);
    }

    draw() {
        this.queue.forEach((enemy) => enemy.draw());
    }

    update(gameSpeed: number, frameTime: number) {
        if (this.interval <= 0) {
            this.createEnemySprite();
            this.setNextShowTime();
        }
        this.interval -= frameTime;

        this.queue.forEach((enemy) => {
            enemy.update(this.speed, gameSpeed, frameTime, this.scaleRatio);
        });

        this.queue = this.queue.filter((enemy) => enemy.position.x > -enemy.width);
    }

    checkCollision(player: Player) {
        return this.queue.some((enemy) => enemy.isCollidedWith(player));
    }

    reset() {
        this.queue = [];
    }
}
