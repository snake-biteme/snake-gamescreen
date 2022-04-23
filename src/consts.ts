export const COLUMNS = 20;
export const ROWS = 20;
export const TICK = 400;
export const MIN_LENGTH = 3;
export const ACTIVE = true;
export const INACTIVE = false;


const rootElement = document.getElementById('root');

export const VERSION: string = rootElement?.getAttribute('data-version') || '';
export const API_URL: string = rootElement?.getAttribute('data-api-url') || '';
export const AWS_REGION: string = rootElement?.getAttribute('data-aws-region') || 'eu-west-1';
export const AWS_ACCESS_KEY_ID: string = rootElement?.getAttribute('data-access-key-id') || '';
export const AWS_SECRET_ACCESS_KEY: string = rootElement?.getAttribute('data-secret-access-key') || '';
