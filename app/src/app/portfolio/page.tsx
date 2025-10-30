import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Products - Roosh",
    description: "Product list from the Roosh database",
};

const products = [
    {
        product_id: 1,
        name: "Premium Airport Parking",
        rating: 4.5,
        location: "2.3 km from airport",
        transfer: "Shuttle every 15 min",
        price_per_day: 25.5,
        tags: ["Secure", "Covered"],
        img: "/placeholder.png", // You can replace this later
    },
    {
        product_id: 2,
        name: "Budget Outdoor Parking",
        rating: 4.0,
        location: "5.0 km from airport",
        transfer: "Free shuttle",
        price_per_day: 15.0,
        tags: ["Secure"],
        img: "/placeholder.png",
    },
    {
        product_id: 3,
        name: "VIP Valet Parking",
        rating: 4.9,
        location: "0.5 km from airport",
        transfer: "Valet drop-off",
        price_per_day: 35.0,
        tags: ["Covered", "Secure"],
        img: "/placeholder.png",
    },
];

export default function Home() {
    return (
        <main className="my-5">
            <h1 className="fw-bold mb-4 text-center">Available Parking Services</h1>

            <div className="d-flex flex-column gap-3">
                {products.map((p) => (
                    <div
                        key={p.product_id}
                        className="card shadow-sm border-0 rounded-3 p-3"
                    >
                        <div className="row g-3 align-items-center">
                            {/* Image */}
                            <div className="col-md-3 text-center">
                                <div className="bg-light rounded-3 overflow-hidden" style={{ height: "160px" }}>
                                    <Image
                                        src={p.img}
                                        alt={p.name}
                                        width={240}
                                        height={160}
                                        className="object-fit-cover w-100 h-100"
                                    />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="col-md-6">
                                <h5 className="fw-semibold mb-1">{p.name}</h5>
                                <div className="text-muted small mb-2">⭐ {p.rating.toFixed(1)} / 5</div>
                                <div className="small">
                                    <div><strong>Location:</strong> {p.location}</div>
                                    <div><strong>Transfer:</strong> {p.transfer}</div>
                                </div>

                                {/* Tags */}
                                <div className="mt-2 small text-muted">
                                    {p.tags.join(" • ")}
                                </div>
                            </div>

                            {/* Price + Button */}
                            <div className="col-md-3 text-end">
                                <div className="fw-semibold">Price</div>
                                <div className="fs-5 fw-bold">${p.price_per_day.toFixed(2)} / day</div>
                                <button className="btn btn-outline-dark mt-3 px-4">Book now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
