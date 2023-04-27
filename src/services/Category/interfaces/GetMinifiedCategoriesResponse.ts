import type {MinifiedCategory} from '@/services/CategoryProduct/types/MinifiedCategory';

export interface GetMinifiedCategoriesResponse {
    [categoryId: string]: MinifiedCategory
}