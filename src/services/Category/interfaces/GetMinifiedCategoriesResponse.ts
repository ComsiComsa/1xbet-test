import type { MinifiedCategory } from '@/services/Category/types/MinifiedCategory';

export interface GetMinifiedCategoriesResponse {
    [categoryId: string]: MinifiedCategory
}