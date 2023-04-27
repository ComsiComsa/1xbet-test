import { defineStore } from 'pinia';
import type { Goods } from '@/common/models/Goods';
import { GoodsService } from '@/services/Goods/GoodsService';

type GoodsStoreState = {
    goods: { [categoryId: string]: Goods[] };
    isLoading: boolean;
};

export const useGoodsStore = defineStore('goods', {
    state: (): GoodsStoreState => ({
        goods: {},
        isLoading: false,
    }),
    actions: {
        async getGoods(): Promise<void> {
            this.isLoading = true;
            
            try {
                this.goods = await GoodsService.getGoods();
            } catch (error) {
                console.error('Error getGoods, ', error);
            } finally {
                this.isLoading = false;
            }
        },       
    },
});