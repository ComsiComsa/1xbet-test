<template>
    <div class="goods-list">
        <goods-item 
            v-for="item in goods"
            :key="item.id"
            :item="item"
            :title="goodsIds[item.id][0]"
            @click="handleItemClick(item)"
        />
    </div>
</template>

<script lang="ts">
import type { Goods } from '@/common/models/Goods';
import GoodsItem from '@/components/GoodsItem.vue';
import { useCartStore } from '@/stores/cart';

type GoodsIds = {
    [goodsId: number]: [name: string, limit: number];
};

type GoodsListProps = {
    goods: Goods[];
    goodsIds: GoodsIds;
};
export default {
    name: 'GoodsList',
    components: {
        GoodsItem
    },
    props: {
        goods: {
            required: true,
            type: Array as () => Goods[],
        },
        goodsIds: {
            required: true,
            type: Object as () => GoodsIds,
        },
    },
    setup(props: GoodsListProps) {
        const cartStore = useCartStore();

        const handleItemClick = (goods: Goods): void => {
            const title: string = props.goodsIds[goods.id][0];
            cartStore.addGoodsToCart(title, goods);
        };

        return {
            handleItemClick,
        };
    },
};
</script>