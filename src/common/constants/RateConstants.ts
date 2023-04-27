export const MIN_RATE = 20;
export const MAX_RATE = 80;
export const DECIMAL_PLACES = 2;
export const DEFAULT_USD_TO_RUB_RATE = 20;
export const RUBLES_FORMATTER = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
});