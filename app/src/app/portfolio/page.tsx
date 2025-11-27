import {ProductService} from "@/services/ProductService";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";

type PageProps = {
    searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Portfolio({searchParams}: PageProps) {
    const rawPage = Array.isArray(searchParams?.page)
        ? searchParams?.page[0]
        : searchParams?.page;

    const pageNum = rawPage ? parseInt(String(rawPage), 10) : 1;
    const safePage = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1;

    const products = await ProductService.getProducts(safePage);

    return (
        <main className="my-5 container">
            <h1 className="fw-bold mb-4 text-center">Available Parking Services</h1>

            {products.length === 0 ? (
                <div className="text-center text-muted fs-5 my-5">
                    No parking products found.
                </div>
            ) : (
                <div>
                    <ProductList products={products}/>
                    <div className={"mt-2"}>
                        <Pagination currentPage={safePage} maxPage={10}/>
                    </div>
                </div>
            )}
        </main>
    );
}
