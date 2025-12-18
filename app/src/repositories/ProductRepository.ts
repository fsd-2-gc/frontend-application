import type {Product} from "@/models/Product";

export class ProductRepository {
    private static get BASE_URL() {
        return process.env.API_BASE_URL as string;
    }

    private static get API_KEY() {
        return process.env.API_KEY as string;
    }

    static async getProducts(page: number = 1, minRating: number = 0, startDate?: string, endDate?: string) {
        const clamped = Number.isFinite(minRating as number)
            ? Math.min(5, Math.max(0, Number(minRating)))
            : undefined;

        const params = new URLSearchParams({
            page: String(page),
        });
        if (clamped !== undefined) {
            params.set("min_rating", String(clamped));
        }

        if (startDate){
            params.set("start_Date", startDate);
        }

        if (endDate){
            params.set("end_Date", endDate)
        }

        const url = `${this.BASE_URL}/getproducts/?${params.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.API_KEY,
            },
        });

        const json = await response.json();

        const items: Product[] = Object.values(json.data.items).map((v: any) => ({
            id: Number(v.product_id),
            name: String(v.name),
            price_per_day: Number(v.price_per_day),
            rating: Number(v.rating),
        }));

        return {
            "total": json.data.total,
            "items": items,
        };
    }

    static async getProduct(id: number) {
        if (
            !Number.isFinite(id as number)
            || id <= 0
        ) {
            return null;
        }

        const url = `${this.BASE_URL}/getproduct/${id}/`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.API_KEY,
            },
        });

        const json = await response.json();
        let productData = json.data;

        const product: Product = {
            id: Number(productData.product_id),
            name: String(productData.name ?? ""),
            price_per_day: Number(productData.price_per_day ?? 0),
            rating: Number(productData.rating ?? 0),
        };

        return product;
    }
}
