import {v4 as uuidv4} from 'uuid';

export const COLUMNS = 20;
export const ROWS = 20;
export const TICK = 200;
export const MIN_LENGTH = 3;
export const ACTIVE = true;
export const INACTIVE = false;
export const SCREEN_ID = uuidv4();

const rootElement = document.getElementById('root');

export const API_URL: string = rootElement?.getAttribute('data-api-url') || '';
export const CONTROLLER_URL: string = rootElement?.getAttribute('data-controller-url') || '';
export const AWS_REGION: string = rootElement?.getAttribute('data-aws-region') || 'eu-west-1';
export const AWS_ACCESS_KEY_ID: string = rootElement?.getAttribute('data-access-key-id') || '';
export const AWS_SECRET_ACCESS_KEY: string = rootElement?.getAttribute('data-secret-access-key') || '';
