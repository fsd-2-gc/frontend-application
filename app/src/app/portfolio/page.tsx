import {Suspense} from "react";
import { ProductService } from "@/services/ProductService";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";

type PageProps = {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined } | null>;
};

async function PortfolioContent({ searchParams }: { searchParams: PageProps["searchParams"] }) {
    const params = (searchParams ? await searchParams : undefined) ?? {};

    const rawPage = Array.isArray(params.page)
        ? params.page[0]
        : params.page;

    const pageNum = rawPage ? parseInt(String(rawPage), 10) : 1;
    const safePage = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1;

    const rawMin = Array.isArray(params.min_rating)
        ? params.min_rating[0]
        : (params as any)?.min_rating;

    const minVal = rawMin !== undefined ? parseFloat(String(rawMin)) : 0;
    const safeMin = Number.isFinite(minVal) ? Math.min(5, Math.max(0, minVal)) : 0;


    const rawStartDate = Array.isArray(params.start_date)
        ? params.start_date[0]
        : params.start_date;

    const rawEndDate = Array.isArray(params.end_date)
        ? params.end_date[0]
        : params.end_date;

    const startDate =
        rawStartDate && !isNaN(Date.parse(String(rawStartDate)))
            ? String(rawStartDate)
            : undefined;

    const endDate =
        rawEndDate && !isNaN(Date.parse(String(rawEndDate)))
            ? String(rawEndDate)
            : undefined;


    const products = await ProductService.getProducts(safePage, safeMin, startDate, endDate);

    return (
        <div>
            <ProductList products={products.items} />
            <div className={"mt-2"}>
                <Pagination currentPage={safePage} maxPage={products.total_pages} />
            </div>
        </div>
    );
}

export default async function Portfolio({ searchParams }: PageProps) {
    return (
        <main className="my-5 container">
            <h1 className="fw-bold mb-4 text-center">Available Parking Services</h1>

            <Suspense fallback={<div>Loading...</div>}>
                <PortfolioContent searchParams={searchParams} />
            </Suspense>
        </main>
    );
}
