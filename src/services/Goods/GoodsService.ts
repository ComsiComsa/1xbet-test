import axios from 'axios';
import type { GetMinifiedGoodsResponse} from './interfaces/GetMinifiedGoodsResponse';
import { Goods } from '@/common/models/Goods';
import type { MinifiedGoods } from '@/services/Goods/types/MinifiedGoods';
import { URL_DATA_PATH } from '@/common/constants/UrlConstants';

type GoodsWrapper = {
    [categoryId: number]: Goods[];
};

export class GoodsService {
    static async getGoods(): Promise<GoodsWrapper> {
        let goods: GoodsWrapper = {};

        try {
            const response = await axios.get<GetMinifiedGoodsResponse>(URL_DATA_PATH);
            goods = this.parseMinifiedGoods(response.data.Value.Goods);
        } catch (error) {
            console.error('Error getGoods, ', error);
        }

        return goods;
    }
    
    private static parseMinifiedGoods(minifiedGoods: MinifiedGoods[]): GoodsWrapper {
        const allGoods: GoodsWrapper = {};

        for (const goods of minifiedGoods) {
            const groupId = goods.G;
            const newGoods = new Goods({
                id: goods.T,
                price: goods.C,
                remaining: goods.P,
            });

            // eslint-disable-next-line no-prototype-builtins
            if (!allGoods.hasOwnProperty(groupId)) {
                allGoods[groupId] = [];
            }

            allGoods[groupId].push(newGoods);
        }

        return allGoods;
    }
}
