import { BASE_PADDING, STANDARD_FONT_SIZE, } from './config';

import { formatGameTimer } from '../../utils';

export interface CommonFunctionProps {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    scaleRatio: number;
}

export function showScore(score: number, { ctx, scaleRatio }: CommonFunctionProps) {
    ctx.font = `${STANDARD_FONT_SIZE * scaleRatio}px Joystix monospace`;
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'grey';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, BASE_PADDING, BASE_PADDING);
}

export function showTimer(timer: number, { ctx, canvas, scaleRatio }: CommonFunctionProps) {
    ctx.font = `${STANDARD_FONT_SIZE * scaleRatio}px Joystix monospace`;
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'grey';
    ctx.textAlign = 'right';
    const x = canvas.width - BASE_PADDING;
    ctx.fillText(`Time: ${formatGameTimer(timer)}`, x, BASE_PADDING);
}
