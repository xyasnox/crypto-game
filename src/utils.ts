import { GAME_HEIGHT, GAME_WIDTH } from './components/Game/config';

export function percentage(partialValue: number, totalValue: number) {
    return Math.round((100 * partialValue) / totalValue);
}

export function formatTimestamp(timestamp?: number): string | null {
    if (!timestamp) return null;
    if (timestamp <= 0) return '';

    const hours = Math.floor(timestamp / 60 / 60 / 1000);
    const minutes = Math.floor(timestamp / 60 / 1000) - hours * 60;
    const seconds = Math.floor((timestamp / 1000) % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function formatGameTimer(time?: number): string | null {
    if (!time) return null;
    if (time <= 0) return `00:00`;

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getScaleRatio = () => {
    const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

    const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeight / GAME_HEIGHT;
    }
};
