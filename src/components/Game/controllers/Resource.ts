import { Player, Resource, ResourceObj } from '../classes';
import { CommonConstructorProps } from '../typings';
import { getRandomNumber } from '../../../utils';
import { RESOURCE_INTERVAL } from '../config';

interface ResourceControllerInterface {
    draw(): void;
    update(gameSpeed: number, frameTime: number): void;
    createResourceSprite(): void;
    checkCollision(sprite: Player): void;
    reset(): void;
}

interface ResourceControllerConstructor extends CommonConstructorProps {
    source: ResourceObj;
    scaleRatio: number;
    speed: number;
}

export class ResourceController implements ResourceControllerInterface {
    private interval: number = 0;

    private queue: Resource[] = [];

    private source: ResourceObj;
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly scaleRatio: number;
    private readonly speed: number;

    constructor({ canvas, ctx, source, scaleRatio, speed }: ResourceControllerConstructor) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.source = source;

        this.scaleRatio = scaleRatio;
        this.speed = speed;
    }

    draw() {
        this.queue.forEach((resource) => resource.draw());
    }

    update(gameSpeed: number, frameTime: number) {
        if (this.interval <= 0) {
            this.createResourceSprite();
            this.interval = RESOURCE_INTERVAL;
        }
        this.interval -= frameTime;

        this.queue.forEach((resource) => {
            resource.update(this.speed, gameSpeed, frameTime, this.scaleRatio);
        });

        this.queue = this.queue.filter((enemy) => enemy.position.x > -enemy.width);
    }

    createResourceSprite() {
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - this.source.height - getRandomNumber(this.source.minY, this.source.maxY);

        const mainImage = new Image();
        mainImage.src = this.source.imageSrc;

        const hiddenImage = new Image();
        hiddenImage.src = this.source.hiddenImageSrc;

        const resource = new Resource({
            canvas: this.canvas,
            ctx: this.ctx,
            position: {
                x,
                y,
            },
            width: this.source.width,
            height: this.source.height,
            image: mainImage,
            hiddenImage,
        });

        this.queue.push(resource);
    }

    checkCollision(player: Player) {
        return this.queue.some((resource) => resource.isCollidedWith(player));
    }

    reset() {
        this.queue = [];
    }
}
