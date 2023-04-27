import { defineStore } from 'pinia';
import type { Goods } from '@/common/models/Goods';
import { CartItem } from '@/common/models/CartItem';
import { useRateStore } from '@/stores/rate';
import { RUBLES_FORMATTER, DECIMAL_PLACES } from '@/common/constants/RateConstants';

type CartStoreState = {
    cart: CartItem[];
};

export const useCartStore = defineStore('cart', {
    state: (): CartStoreState => ({
        cart: [],
    }),
    getters: {
        getCartItemPrice: (state) => (goodsId: number): string => {
            let price = 0;

            const rateStore = useRateStore();
            const cartItem = state.cart.find(item => item.goodsId === goodsId);

            if (cartItem) {
                price = cartItem.price * cartItem.count;
            }

            price *= rateStore.usdToRubRate;

            return RUBLES_FORMATTER.format(parseFloat(price.toFixed(DECIMAL_PLACES)));
        },
        getCartTotalPrice: (state): string => {
            const rateStore = useRateStore();

            let price = 0;

            for (const item of state.cart) {
                price += item.count * item.price;
            }

            price *= rateStore.usdToRubRate;

            return RUBLES_FORMATTER.format(parseFloat(price.toFixed(DECIMAL_PLACES)));
        },
        isGoodsInCart: (state) => (goodsId: number): boolean => {
            const index = state.cart.findIndex(item => item.goodsId === goodsId);
            return index !== -1;
        },
    },
    actions: {
        addGoodsToCart(title: string, goods: Goods): void {
            const index = this.cart.findIndex(item => item.goodsId === goods.id);

            if (index === -1) {
                const newCartItem = new CartItem({
                    goodsId: goods.id,
                    price: goods.price,
                    remaining: goods.remaining,
                    title,
                });
                this.cart.push(newCartItem);
            } else {
                if (+this.cart[index].count === this.cart[index].remaining) {
                    return;
                }

                this.cart[index].count = +this.cart[index].count + 1;
            }
        },

        removeGoodsFromCart(goodsId: number): void {
            const index = this.cart.findIndex(item => item.goodsId === goodsId);

            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },
    }
});