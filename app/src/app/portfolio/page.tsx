"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/v1/getproducts/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": "dev-secret-key"
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    console.error("API Error:", res.status, text);
                    setLoading(false);
                    return;
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                    console.log("API response:", data);
                    setProducts(Array.isArray(data.data) ? data.data : []);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("API fetch error:", err);
                setLoading(false);
            });
    }, []);

    return (
        <main className="my-5 container">
            <h1 className="fw-bold mb-4 text-center">Available Parking Services</h1>

            {/* Loading */}
            {loading && (
                <div className="text-center text-muted fs-5 my-5">
                    Loading products...
                </div>
            )}

            {/* Empty state */}
            {!loading && products.length === 0 && (
                <div className="text-center text-muted fs-5 my-5">
                    No parking products found.
                </div>
            )}

            {/* Product Cards */}
            {!loading && products.length > 0 && (
                <div className="d-flex flex-column gap-3">
                    {products.map((p) => (
                        <div
                            key={p.product_id}
                            className="card shadow-sm border-0 rounded-3 p-3"
                        >
                            <div className="row g-3 align-items-center">

                                {/* Image */}
                                <div className="col-md-3 text-center">
                                    <div
                                        className="bg-light rounded-3 overflow-hidden"
                                        style={{ height: "160px" }}
                                    >
                                        <Image
                                            src="/placeholder.jpg"
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
                                    <div className="text-muted small mb-2">
                                        ⭐ {p.rating ? Number(p.rating).toFixed(1) : "N/A"} / 5
                                    </div>

                                    {/* Optional future backend fields */}
                                    {/* <div className="small"><strong>Location:</strong> {p.location}</div> */}
                                    {/* <div className="small"><strong>Transfer:</strong> {p.transfer}</div> */}
                                </div>

                                {/* Price + CTA */}
                                <div className="col-md-3 text-end">
                                    <div className="fw-semibold">Price</div>
                                    <div className="fs-5 fw-bold">
                                        ${Number(p.price_per_day).toFixed(2)}
                                    </div>
                                    <Link href={`/product/${p.product_id}`} className="btn btn-outline-dark mt-3 px-4">
                                        Book now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
