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
    private background: CommonBackgroundProps;

    constructor({ canvas, ctx, scaleRatio }: BackgroundConstructor) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.background = {
            x: 0,
            y: 0,
            image: new Image(),
            width: 800 * scaleRatio,
            height: 200 * scaleRatio,
        };

        this.background.image.src = '../../sprites/background/background.png';
    }

    draw() {
        this.ctx.drawImage(this.background.image, this.background.x, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(
            this.background.image, this.background.x + this.background.width, this.background.y, this.background.width, this.background.height
        );

        if (this.background.x < -this.background.width) {
            this.background.x = 0;
        }
    }

    update(gameSpeed: number, frameTimeDelta: number, scaleRatio: number) {
        this.background.x -= gameSpeed * frameTimeDelta * scaleRatio;
    }

    
}
