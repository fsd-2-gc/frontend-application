import type {Product} from "@/models/Product";

export class ProductRepository {
    private static get BASE_URL() {
        return process.env.API_BASE_URL as string;
    }

    private static get API_KEY() {
        return process.env.API_KEY as string;
    }

    static async getProducts() {
        const url = `${this.BASE_URL}/getproducts/`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.API_KEY,
            },
        });

        const json = await response.json();

        const items: Product[] = Object.values(json.data).map((v: any) => ({
            id: Number(v.product_id),
            name: String(v.name),
            price_per_day: Number(v.price_per_day),
            rating: Number(v.rating),
        }));
        return items;
    }
}
