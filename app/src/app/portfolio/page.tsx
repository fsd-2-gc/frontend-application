import "bootstrap/dist/css/bootstrap.min.css";
import {ProductService} from "@/services/ProductService";
import type {Product} from "@/models/Product";
import ProductList from "@/components/ProductList";

export default async function Home() {
    const products: Product[] = await ProductService.getProducts();

    return (
        <main className="my-5 container">
            <h1 className="fw-bold mb-4 text-center">Available Parking Services</h1>

            {products.length === 0 ? (
                <div className="text-center text-muted fs-5 my-5">
                    No parking products found.
                </div>
            ) : (
                <ProductList products={products}/>
            )}
        </main>
    );
}
