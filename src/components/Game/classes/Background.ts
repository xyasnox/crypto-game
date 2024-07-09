import { CommonConstructorProps } from '../typings';

interface BackgroundConstructor extends CommonConstructorProps {
    scaleRatio: number;
}

interface BackgroundInterface {
    draw(): void;
}

type CommonBackgroundProps = {
    x: number;
    y: number;
    image: HTMLImageElement;
    width: number;
    height: number;
};

export class Background implements BackgroundInterface {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private ship: CommonBackgroundProps;
    private sea: CommonBackgroundProps;

    constructor({ canvas, ctx, scaleRatio }: BackgroundConstructor) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ship = {
            x: 0,
            y: canvas.height - 60 * scaleRatio,
            image: new Image(),
            width: 800 * scaleRatio,
            height: 60 * scaleRatio,
        };

        this.ship.image.src = '../../sprites/background/ship.png';

        this.sea = {
            x: 0,
            y: -20,
            image: new Image(),
            width: 800 * scaleRatio,
            height: 200 * scaleRatio,
        };

        this.sea.image.src = '../../sprites/background/sea.png';
    }

    draw() {
        this.ctx.drawImage(this.sea.image, this.sea.x, this.sea.y, this.sea.width, this.sea.height);
        this.ctx.drawImage(this.ship.image, this.ship.x, this.ship.y, this.ship.width, this.ship.height);
    }
}
