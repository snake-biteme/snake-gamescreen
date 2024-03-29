import {v4 as uuidv4} from 'uuid';

export const TILE_SIZE = 24;

// dont forget to account for borders
export const BOARD_WIDTH = window.innerWidth - 400;
export const BOARD_HEIGHT = window.innerHeight - 350;
export const COLUMNS = Math.floor(BOARD_WIDTH/ (TILE_SIZE + 2));
export const ROWS = Math.floor(BOARD_HEIGHT/ (TILE_SIZE + 2));
export const TICK = 300;
export const MIN_LENGTH = 3;
export const ACTIVE = true;
export const INACTIVE = false;
export const SCREEN_ID = uuidv4();
export const FOOD_COEFFICIENT = 3;
export const FOODS = ['apple', 'banana', 'cherries', 'lemon', 'mango', 'orange', 'pineapple', 'watermelon'];
export const KILL_BONUS = 4;

const rootElement = document.getElementById('root');

export const API_URL: string = rootElement?.getAttribute('data-api-url') || '';
export const CONTROLLER_URL: string = rootElement?.getAttribute('data-controller-url') || '';
export const AWS_REGION: string = rootElement?.getAttribute('data-aws-region') || 'eu-west-1';
export const AWS_ACCESS_KEY_ID: string = rootElement?.getAttribute('data-access-key-id') || '';
export const AWS_SECRET_ACCESS_KEY: string = rootElement?.getAttribute('data-secret-access-key') || '';
export const AMPLITUDE_API_KEY: string | null = rootElement?.getAttribute('data-amplitude-api-key') || null;
