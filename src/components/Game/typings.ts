export interface CommonConstructorProps {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

export interface Position {
    x: number;
    y: number;
}

export interface GameInfo {
    isGameOver: boolean;
    score: number;
    isPlayerAlive: boolean;
}
