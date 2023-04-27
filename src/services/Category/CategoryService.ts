import axios from 'axios';
import type { GetMinifiedCategoriesResponse} from '@/services/Category/interfaces/GetMinifiedCategoriesResponse';
import { Category } from '@/common/models/Category';
import type { MinifiedCategory} from '@/services/Category/types/MinifiedCategory';
import { URL_NAMES_PATH } from '@/common/constants/UrlConstants';

export class CategoryService {
    static async getCategories(): Promise<Category[]> {
        const categories: Category[] = [];

        try {
            const response = await axios.get<GetMinifiedCategoriesResponse>(URL_NAMES_PATH);

            for (const [categoryId, minifiedCat] of Object.entries(response.data)) {
                const category = this.createCategory(categoryId, minifiedCat);
                categories.push(category);
            }
        } catch (error) {
            console.error('Error getCategories, ', error);
        }

        return categories;
    }

    private static createCategory(id: string, minifiedCat: MinifiedCategory): Category {
        const category = new Category();

        category.id = id;
        category.name = minifiedCat.G;

        for (const [goodsId, minifiedGoods] of Object.entries(minifiedCat.B)) {
            category.goodsIds[goodsId] = [minifiedGoods.N, minifiedGoods.T];
        }

        return category;
    }
}