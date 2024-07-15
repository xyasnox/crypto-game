import { MS_IN_SECOND, SECONDS_IN_MINUTE } from '../../constants';

export const GAME_SPEED_START = 0.5;

export const GAME_WIDTH = 375;
export const GAME_HEIGHT = 200;
export const PLAYER_MODEL_WIDTH = 56 / 1.5;
export const PLAYER_MODEL_HEIGHT = 72 / 1.5;
export const MAX_JUMP_HEIGHT = 150;
export const MIN_JUMP_HEIGHT = 120;

export const ENEMY_INTERVAL_MIN = 1600;
export const ENEMY_INTERVAL_MAX = 2500;

export const OBJECT_SPEED = 0.6;

export const TIMER_TIME = MS_IN_SECOND;

export const BASE_PADDING = 10;
export const STANDARD_FONT_SIZE = 16;

export const GRAVITY = 0.25;
export const JUMP_SPEED = 0.25;
export const WALK_ANIMATION_TIMER = 100;

export const RESOURCE_INTERVAL = 70;

export const INITIAL_TIMER = SECONDS_IN_MINUTE / 2;

export const ENEMY_CONFIG = [
    { minY: 4, maxY: 25, width: 41, height: 40, image: '../sprites/enemies/1.png' },
    { minY: 6, maxY: 18, width: 42, height: 40, image: '../sprites/enemies/2.png' },
    { minY: 2, maxY: 20, width: 42, height: 40, image: '../sprites/enemies/3.png' },
];

export const COIN_CONFIG = {
    minY: 5,
    maxY: MAX_JUMP_HEIGHT,
    width: 32 / 1.5,
    height: 32 / 1.5,
    image: '../sprites/resource/coin/main.png',
    hidden: '../sprites/resource/coin/erase.png',
};
