import {defineStore} from 'pinia';
import type {Category} from '@/common/models/Category';
import {CategoryService} from '@/services/Category/CategoryService';

type CategoryStoreState = {
    categories: Category[];
    isLoading: boolean;
}

export const useCategoryStore = defineStore('category', {
    state: (): CategoryStoreState => ({
        categories: [],
        isLoading: false,
    }),
    actions: {
        async getCategories(): Promise<void> {
            this.isLoading = true;

            try {
                this.categories = await CategoryService.getCategories();
            } catch (error) {
                console.error('Error getNamesMap, ', error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});