import { CommonConstructorProps, Position } from '../typings';

import { Player } from './Player';

export interface EnemyObj {
    image: HTMLImageElement;
    minY: number;
    maxY: number;
    width: number;
    height: number;
}

interface EnemyConstructorProps extends CommonConstructorProps {
    position: Position;
    width: number;
    height: number;
    image: HTMLImageElement;
}

interface EnemyInterface {
    update(speed: number, gameSpeed: number, frameTimeDelta: number, scaleRatio: number): void;

    draw(): void;

    isCollidedWith(player: Player): void;
}

export class Enemy implements EnemyInterface {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    public position: Position;
    readonly width: number;
    private transform: number;
    private readonly height: number;
    private readonly image: HTMLImageElement;

    constructor({ canvas, ctx, position, width, height, image }: EnemyConstructorProps) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.position = position;
        this.width = width;
        this.height = height;
        this.image = image;
        this.transform = 0;
    }

    update(speed: number, gameSpeed: number, frameTimeDelta: number, scaleRatio: number) {
        this.position.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
        if (this.transform >= 360) {
            this.transform = 0;
        } else {
            this.transform++;
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    isCollidedWith(sprite: Player) {
        const adjustBy = 1.2;

        return (
            this.position.x < sprite.position.x + sprite.width / adjustBy &&
            this.position.x + this.width / adjustBy > sprite.position.x &&
            this.position.y < sprite.position.y + sprite.height / adjustBy &&
            this.height + this.position.y / adjustBy > sprite.position.y
        );
    }
}
