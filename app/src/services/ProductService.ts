import {ProductRepository} from "@/repositories/ProductRepository";

export class ProductService {
    static async getProducts(page: number = 1) {
        const data = await ProductRepository.getProducts(page);
        let totalPages = 1;

        if (data.total > 25) {
            totalPages = Math.ceil(data.total / 25);
        }

        return {
            "total_pages": totalPages,
            "items": data.items,
        }
    }
}
