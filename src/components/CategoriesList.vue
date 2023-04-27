<template>
    <section class="categories-list">
        <div class="categories-list__column">
            <app-accordion
                v-for="category in leftColumnCategories"
                :key="category.id"
                :disabled="!goods[category.id]"
                v-model="category.visible"
                :title="category.name"
            >
                <template #content>
                    <goods-list
                        v-if="goods[category.id]"
                        :goods="goods[category.id]"
                        :goods-ids="category.goodsIds"
                    />
                </template>
            </app-accordion>
        </div>

        <div class="categories-list__column">
            <app-accordion
                v-for="category in rightColumnCategories"
                :key="category.id"
                :disabled="!goods[category.id]"
                v-model="category.visible"
                :title="category.name"
            >
                <template #content>
                    <goods-list
                        v-if="goods[category.id]"
                        :goods="goods[category.id]"
                        :goods-ids="category.goodsIds"
                    />
                </template>
            </app-accordion>
        </div>
    </section>
</template>

<script lang="ts">
import AppAccordion from '@/components/ui/AppAccordion.vue';
import GoodsList from '@/components/GoodsList.vue';
import { useGoodsStore } from '@/stores/goods';
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
import { computed, type ComputedRef } from 'vue';
import type { Category } from '@/common/models/Category';
export default {
    name: 'CategoriesList',
    components: {
        AppAccordion,
        GoodsList,
    },
    setup() {
        const goodsStore = useGoodsStore();
        const categoryStore = useCategoryStore();

        const {
            goods,
        } = storeToRefs(goodsStore);

        const {
            categories,
        } = storeToRefs(categoryStore);

        const leftColumnCategories: ComputedRef<Category[]> = computed(() => {
            return categories.value.filter((_, index) => index % 2 === 0);
        });
        const rightColumnCategories: ComputedRef<Category[]> = computed(() => {
            return categories.value.filter((_, index) => index % 2 === 1);
        });

        return {
            goods,
            leftColumnCategories,
            rightColumnCategories,
        };
    }
};
</script>