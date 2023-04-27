import type { MinifiedGoods } from '@/services/Category/types/MinifiedGoods';

export type MinifiedCategory = {
    G: string;                                // Category name
    B: { [goodsId: string]: MinifiedGoods };  // Possible category's goods
    C?: number;
}