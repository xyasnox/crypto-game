import { SECONDS_IN_MINUTE, MS_IN_SECOND } from '../../constants';

export const GAME_SPEED_START = 0.5;

export const GAME_WIDTH = 375;
export const GAME_HEIGHT = 200;
export const PLAYER_MODEL_WIDTH = 58 / 1.5;
export const DEAD_PLAYER_MODEL_WIDTH = 77 / 1.5;
export const PLAYER_MODEL_HEIGHT = 74 / 1.5;
export const MAX_JUMP_HEIGHT = 150;
export const MIN_JUMP_HEIGHT = 120;

export const ENEMY_INTERVAL_MIN = 700;
export const ENEMY_INTERVAL_MAX = 1600;

export const OBJECT_SPEED = 0.75;

export const TIMER_TIME = MS_IN_SECOND;

export const BASE_PADDING = 10;
export const BIG_FONT_SIZE = 24;
export const STANDARD_FONT_SIZE = 16;

export const GRAVITY = 0.7;
export const JUMP_SPEED = 0.6;
export const WALK_ANIMATION_TIMER = 100;

export const RESOURCE_INTERVAL = 70;

export const INITIAL_TIMER = SECONDS_IN_MINUTE / 2;

export const ENEMY_CONFIG = [
    { minY: 5, maxY: 5, width: 42 / 1.5, height: 44 / 1.5, image: '../sprites/enemies/barrel.png' },
    { minY: 5, maxY: MIN_JUMP_HEIGHT, width: 30 / 1.5, height: 30 / 1.5, image: '../sprites/enemies/cannon-ball.png' },
];

export const COIN_CONFIG = {
    minY: 5,
    maxY: MAX_JUMP_HEIGHT,
    width: 32 / 1.5,
    height: 32 / 1.5,
    image: '../sprites/resource/coin/main.png',
    hidden: '../sprites/resource/coin/erase.png',
};
