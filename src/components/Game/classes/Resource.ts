import { CommonConstructorProps, Position } from '../typings';
import { Player } from './Player';

export interface ResourceObj {
    minY: number;
    maxY: number;
    width: number;
    height: number;
    imageSrc: string;
    hiddenImageSrc: string;
}

interface ResourceConstructorProps extends CommonConstructorProps {
    position: Position;
    width: number;
    height: number;
    image: HTMLImageElement;
    hiddenImage: HTMLImageElement;
}

interface ResourceInterface {
    draw(): void;
    update(speed: number, gameSpeed: number, frameTimeDelta: number, scaleRatio: number): void;
    isCollidedWith(player: Player): void;
}

export class Resource implements ResourceInterface {
    position: Position;
    private collected: boolean;

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    readonly width: number;
    private readonly height: number;
    private readonly image: HTMLImageElement;
    private readonly hiddenImage: HTMLImageElement;

    constructor({ canvas, ctx, position, width, height, image, hiddenImage }: ResourceConstructorProps) {
        this.position = position;
        this.collected = false;

        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.image = image;
        this.hiddenImage = hiddenImage;
    }

    update(speed: number, gameSpeed: number, frameTimeDelta: number, scaleRatio: number) {
        this.position.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
    }

    draw() {
        this.ctx.drawImage(
            this.collected ? this.hiddenImage : this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );
    }

    isCollidedWith(player: Player) {
        const adjustBy = 1;

        const collided =
            this.position.x < player.position.x + player.width / adjustBy &&
            this.position.x + this.width / adjustBy > player.position.x &&
            this.position.y < player.position.y + player.height / adjustBy &&
            this.height + this.position.y / adjustBy > player.position.y &&
            !this.collected;

        if (collided) {
            this._take();
        }

        return collided;
    }

    private _take() {
        this.collected = true;
    }
}
