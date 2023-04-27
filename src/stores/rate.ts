import { defineStore } from 'pinia';
import { MIN_RATE, MAX_RATE, DECIMAL_PLACES, DEFAULT_USD_TO_RUB_RATE } from '@/common/constants/RateConstants';

type RateStoreState = {
    usdToRubRate: number;
}

export const useRateStore = defineStore('rate', {
    state: (): RateStoreState => ({
        usdToRubRate: DEFAULT_USD_TO_RUB_RATE,
    }),
    actions: {
        getExchangeRate(): void {
            this.usdToRubRate = this._generateRandomNumber(MIN_RATE, MAX_RATE, DECIMAL_PLACES);
        },

        _generateRandomNumber(min: number, max: number, decimalPlaces: number): number {
            const range = max - min;
            const scaleFactor = Math.pow(10, decimalPlaces);
            const secureRandom = crypto.getRandomValues(new Uint32Array(1))[0] / 2**32;
            const randomValue = secureRandom * range + min;
            return Math.round(randomValue * scaleFactor) / scaleFactor;
        },
    },
});