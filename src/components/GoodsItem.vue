<template>
    <div
        class="goods-item"
        :class="{ '-active': isGoodsInCart(item.id) }"
    >
        <p class="goods-item__title">
            {{ `${title} (${item.remaining})` }}
        </p>
        <p class="goods-item__price">
            {{ item.price }}
        </p>
    </div>
</template>

<script lang="ts">
import type { Goods } from '@/common/models/Goods';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { DEFAULT_UNKNOWN_GOODS_TITLE } from '@/common/constants/GoodsConstant';

export default {
    name: 'GoodsItem',
    props: {
        title: {
            type: String,
            default: DEFAULT_UNKNOWN_GOODS_TITLE,
        },
        item: {
            required: true,
            type: Object as () => Goods,
        },
    },
    setup() {
        const cartStore = useCartStore();
        
        const {
            isGoodsInCart,
        } = storeToRefs(cartStore);

        return {
            isGoodsInCart,
        };
    },
};
</script>