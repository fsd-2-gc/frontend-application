import Image from "next/image";
import {ProductService} from "@/services/ProductService";
import type {Product} from "@/models/Product";

type PageProps = {
    params: { id: string };
};

export default async function ProductDetails({params}: PageProps) {
    const product: Product | null = await ProductService.getProduct(Number(params.id));

    if (!product) {
        return <div className="text-center m-5">Product not found</div>;
    }

    return (
        <main className="container my-5">

            {/* Back to search */}
            <div className="mb-3">
                <a href="/portfolio" className="text-decoration-none text-dark fw-semibold">
                    ← Back to search
                </a>
            </div>

            <div className="row g-4">

                {/* Left side: Images + Info */}
                <div className="col-lg-8">

                    <h1 className="fw-bold">{product.name}</h1>
                    <div className="text-muted mb-3">
                        ⭐ {product.rating ? Number(product.rating).toFixed(1) : "N/A"} / 5
                        <span className="ms-3">
                    📍 Airport Parking Location
                </span>
                    </div>

                    {/* Main Image */}
                    <div className="rounded overflow-hidden shadow-sm mb-3" style={{height: "380px"}}>
                        <Image
                            src="https://placehold.co/900x400"
                            width={900}
                            height={400}
                            alt={product.name}
                            unoptimized
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>

                    {/* Thumbnail images */}
                    <div className="d-flex gap-2 mb-4">
                        {[1, 2, 3].map((img) => (
                            <div
                                key={img}
                                className="rounded bg-light"
                                style={{width: "100px", height: "70px"}}
                            />
                        ))}
                    </div>

                    {/* Details section */}
                    <div className="card p-3 shadow-sm">
                        <h5 className="fw-bold mb-3">Details</h5>
                        <p className="text-muted">
                            Secure covered parking near the airport. Shuttle every 15 minutes.
                            CCTV monitored and staffed 24/7.
                        </p>
                    </div>
                </div>

                {/* Right side: Booking */}
                <div className="col-lg-4">
                    <div className="card p-4 shadow-sm border-0">

                        <div className="d-flex justify-content-between fw-bold mb-3">
                            <span>Book your spot</span>
                            <span>Price/day</span>
                        </div>

                        {/* Price breakdown */}
                        <div className="border p-3 mb-3 rounded">
                            <h6 className="fw-bold mb-3">Price breakdown</h6>
                            <div className="d-flex justify-content-between">
                                <span>Price × days</span>
                                <span>--</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Taxes & fees</span>
                                <span>--</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Service fee</span>
                                <span>--</span>
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between fw-bold">
                                <span>Total</span>
                                <span>--</span>
                            </div>
                        </div>

                        <a
                            className="btn fw-semibold py-2 w-100"
                            href={`/createBooking?productId=${product.id}`}
                            style={{backgroundColor: "#fd6a01", color: "#fff"}}
                        >
                            Confirm booking
                        </a>

                        <p className="text-muted text-center small mt-3">
                            You won&apos;t be charged yet. Review booking on the next page.
                        </p>
                    </div>
                </div>
            </div>
        </main>

    );
}
