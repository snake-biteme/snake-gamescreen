import {v4 as uuidv4} from 'uuid';

export const MIN_SIZE = 24;

// dont forget to account for borders
export const COLUMNS = Math.floor((window.innerWidth - 400)/ (MIN_SIZE + 2));
export const ROWS = Math.floor(window.innerHeight/ MIN_SIZE * 0.6);
// export const COLUMNS = 6;
// export const ROWS = 6;
export const TICK = 400;
export const MIN_LENGTH = 3;
export const ACTIVE = true;
export const INACTIVE = false;
export const SCREEN_ID = uuidv4();
export const FOOD_COEFFICIENT = 3;

export const FOODS = ['apple', 'banana', 'cherries', 'lemon', 'mango', 'orange', 'pineapple', 'watermelon'];

const rootElement = document.getElementById('root');

export const API_URL: string = rootElement?.getAttribute('data-api-url') || '';
export const CONTROLLER_URL: string = rootElement?.getAttribute('data-controller-url') || '';
export const AWS_REGION: string = rootElement?.getAttribute('data-aws-region') || 'eu-west-1';
export const AWS_ACCESS_KEY_ID: string = rootElement?.getAttribute('data-access-key-id') || '';
export const AWS_SECRET_ACCESS_KEY: string = rootElement?.getAttribute('data-secret-access-key') || '';
