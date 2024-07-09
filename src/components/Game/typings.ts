export interface CommonConstructorProps {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

export interface Position {
    x: number;
    y: number;
}

export type GameInfo = {
    isGameOver: boolean;
    timer: number;
    score: number;
    isPlayerAlive: boolean;
};
