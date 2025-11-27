import Image from "next/image";
import Link from "next/link";
import type {Product} from "@/models/Product";

type Props = {
    products: Product[];
};

export default function ProductList({products}: Props) {
    return (
        <div className="d-flex flex-column gap-3">
            {products.map((p) => (
                <div key={p.id} className="card shadow-sm border-0 rounded-3 p-3">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-3 text-center">
                            <div className="bg-light rounded-3 overflow-hidden" style={{height: "160px"}}>
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
