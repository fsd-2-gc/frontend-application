import {ProductRepository} from "@/repositories/ProductRepository";

export class ProductService {
    static async getProducts() {
        return await ProductRepository.getProducts();
    }
}
