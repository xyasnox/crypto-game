export function percentage(partialValue: number, totalValue: number) {

    return Math.round((100 * partialValue) / totalValue);
}

export function formatTimer(timestamp?: number): string | null {
    if (!timestamp) return null;

    const hours = Math.floor(timestamp / 60 / 60 / 1000);
    const minutes = Math.floor(timestamp / 60 / 1000) - (hours * 60);
    const seconds = Math.floor(timestamp / 1000 % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
