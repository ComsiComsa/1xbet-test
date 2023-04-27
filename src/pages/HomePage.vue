<template>
    <main class="home">
        <goods-list />
        <user-cart />
    </main>
</template>

<script lang="ts">
import GoodsList from '@/components/CategoriesList.vue';
import { useGoodsStore } from '@/stores/goods';
import { useCategoryStore } from '@/stores/category';
import { onBeforeMount, type Ref, ref, onBeforeUnmount } from 'vue';
import UserCart from '@/components/UserCart.vue';
import { REFRESH_INTERVAL } from '@/common/constants/AppConstants';
import { useRateStore } from '@/stores/rate';

export default {
    name: 'HomePage',
    components: {
        UserCart,
        GoodsList,
    },
    setup() {
        const goodsStore = useGoodsStore();
        const categoriesStore = useCategoryStore();
        const rateStore = useRateStore();

        const refreshInterval: Ref<ReturnType<typeof setInterval> | undefined> = ref(undefined);

        const requestGoodsAndCurrencyRate = (): void => {
            goodsStore.getGoods();
            rateStore.getExchangeRate();
        };

        onBeforeMount((): void => {
            categoriesStore.getCategories();
            requestGoodsAndCurrencyRate();
            refreshInterval.value = setInterval(requestGoodsAndCurrencyRate, REFRESH_INTERVAL);
        });

        onBeforeUnmount((): void => {
            clearInterval(refreshInterval.value);
        });
    },
};
</script>