import type { MinifiedGoods } from '@/services/Goods/types/MinifiedGoods';

export interface GetMinifiedGoodsResponse {
    Error: string;
    Id: number;
    Success: boolean;
    Value: {
        Goods: MinifiedGoods[];
    };
}