<template>
    <section class="user-cart">
        <template v-if="cart.length">
            <app-table
                :options="tableOptions"
                :rows="cart"
            >
                <template v-slot:body-cell-count="{ row }">
                    <app-input
                        :model-value="row.count"
                        @update:model-value="row.count = $event"
                        :min="1"
                        :max="row.remaining"
                        input-type="number"
                    />
                </template>

                <template v-slot:body-cell-action="{ row }">
                    <app-button @click="handleDeleteItem(row?.goodsId || 0)">
                        Удалить
                    </app-button>
                </template>

                <template v-slot:body-cell-price="{ row }">
                    {{ getCartItemPrice(row.goodsId) }}
                </template>
            </app-table>

            <div class="user-cart__info">
                <div
                    class="user-cart__price"
                    :class="rateChangeClass"
                >
                    Итого: {{ getCartTotalPrice }}
                </div>
            </div>
        </template>

        <template v-else>
            <div class="user-cart__banner">
                Необходимо выбрать товары из списка
            </div>
        </template>
    </section>
</template>

<script lang="ts">
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import AppTable from '@/components/ui/AppTable.vue';
import { ref, watch, type Ref } from 'vue';
import type { TableOption } from '@/common/types/TableOption';
import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { useRateStore } from '@/stores/rate';
import { RESET_RATE_CHANGE_CLASS_TIMEOUT } from '@/common/constants/AppConstants';

export default {
    name: 'UserCart',
    components: {
        AppInput,
        AppButton,
        AppTable,
    },
    setup() {
        const cartStore = useCartStore();
        const rateStore = useRateStore();
        
        const rateChangeClass: Ref<string> = ref('');
        const tableOptions: Ref<TableOption[]> = ref([
            { title: 'Наименование товара', field: 'title', style: 'width: 250px' },
            { title: 'Количество', field: 'count', },
            { title: 'Стоимость', field: 'price', },
            { title: '', field: 'action', align: 'right' },
        ]);
        
        const {
            cart,
            getCartItemPrice,
            getCartTotalPrice,
        } = storeToRefs(cartStore);

        const {
            usdToRubRate,
        } = storeToRefs(rateStore);

        const handleDeleteItem = (goodsId: number): void => {
            cartStore.removeGoodsFromCart(goodsId);
        };

        watch(usdToRubRate, function (newValue, oldValue) {
            rateChangeClass.value = oldValue > newValue
                ? '-positive'
                : '-negative';
            
            setTimeout(() => {
                rateChangeClass.value = '';
            }, RESET_RATE_CHANGE_CLASS_TIMEOUT);
        });
        
        return {
            cart,
            tableOptions,
            rateChangeClass,
            getCartItemPrice,
            getCartTotalPrice,
            handleDeleteItem,
        };
    },
};
</script>