import {ProductRepository} from "@/repositories/ProductRepository";

export class ProductService {
    static async getProducts(page: number = 1) {
        return await ProductRepository.getProducts(page);
    }
}
