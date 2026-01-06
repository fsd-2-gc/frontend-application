"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/models/Product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
    products: Product[];
};

export default function ProductList({ products }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const initialMin = (() => {
        const raw = searchParams?.get("min_rating");
        const num = raw !== null ? parseFloat(raw) : 0;
        return Number.isFinite(num) ? Math.min(5, Math.max(0, num)) : 0;
    })();

    const [minRating, setMinRating] = useState<number>(initialMin);

    const [startDate, setStartDate] = useState(
        searchParams?.get("start_date") ?? ""
    );
    const [endDate, setEndDate] = useState(
        searchParams?.get("end_date") ?? ""
    );

    useEffect(() => {
        const raw = searchParams?.get("min_rating");
        const num = raw !== null ? parseFloat(raw) : 0;
        const safe = Number.isFinite(num) ? Math.min(5, Math.max(0, num)) : 0;
        if (safe !== minRating) setMinRating(safe);

        const s = searchParams?.get("start_date") ?? "";
        const e = searchParams?.get("end_date") ?? "";
        if (s !== startDate) setStartDate(s);
        if (e !== endDate) setEndDate(e);

    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        const min = Number(minRating) || 0;
        return products.filter((p) => Number(p.rating) >= min);
    }, [products, minRating]);

    return (
        <div className="d-flex flex-column gap-3">
            {/* Filter controls */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="min-rating" className="form-label mb-0">Filter by rating</label>
                    <select
                        id="min-rating"
                        className="form-select form-select-sm"
                        style={{ maxWidth: 160 }}
                        value={minRating}
                        onChange={(e) => {
                            const value = Math.min(5, Math.max(0, Number(e.target.value)));
                            setMinRating(value);
                            const params = new URLSearchParams(searchParams?.toString() || "");
                            params.set("min_rating", String(value));
                            // If we're changing the filter, make sure we reset to page 1 when needed
                            const rawPage = params.get("page");
                            const currentPage = rawPage ? parseInt(rawPage, 10) : 1;
                            if (!Number.isFinite(currentPage) || currentPage !== 1) {
                                params.set("page", "1");
                            }
                            // Navigate preserving other params
                            router.push(`${pathname}?${params.toString()}`);
                        }}
                    >
                        <option value={0}>All ratings</option>
                        <option value={1}>1+ stars</option>
                        <option value={2}>2+ stars</option>
                        <option value={3}>3+ stars</option>
                        <option value={4}>4+ stars</option>
                        <option value={5}>5 stars</option>
                    </select>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <label className="form-label mb-0">From</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        value={startDate}
                        onChange={(e) => {
                            const value = e.target.value;
                            setStartDate(value);

                            const params = new URLSearchParams(searchParams?.toString() || "");
                            value ? params.set("start_date", value) : params.delete("start_date");
                            params.set("page", "1");

                            router.push(`${pathname}?${params.toString()}`);
                        }}
                    />

                    <label className="form-label mb-0">To</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        value={endDate}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEndDate(value);

                            const params = new URLSearchParams(searchParams?.toString() || "");
                            value ? params.set("end_date", value) : params.delete("end_date");
                            params.set("page", "1");

                            router.push(`${pathname}?${params.toString()}`);
                        }}
                    />
                </div>
            </div>

            {filteredProducts.map((p) => (
                <div key={p.id} className="card shadow-sm border-0 rounded-3 p-3">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-3 text-center">
                            <div className="bg-light rounded-3 overflow-hidden" style={{ height: "160px" }}>
                                <Image
                                    src="https://placehold.co/240x160"
                                    alt={p.name}
                                    width={240}
                                    height={160}
                                    unoptimized
                                    className="object-fit-cover w-100 h-100"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="col-md-6">
                            <h5 className="fw-semibold mb-1">{p.name}</h5>
                            <div className="text-muted small mb-2">⭐ {p.rating ? Number(p.rating).toFixed(1) : "N/A"} /
                                5
                            </div>
                        </div>

                        {/* Price + CTA */}
                        <div className="col-md-3 text-end">
                            <div className="fw-semibold">Price</div>
                            <div className="fs-5 fw-bold">${Number(p.price_per_day).toFixed(2)}</div>
                            <Link href={`/product/${p.id}`} className="btn btn-outline-dark mt-3 px-4">
                                Book now
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
