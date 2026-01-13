import { BookingService } from "@/services/BookingService";
import type { Booking } from "@/models/Booking";
import Link from "next/link";

type PageProps = {
    params: { email: string };
};

export default async function BookingByEmailPage({ params }: PageProps) {
    const { email } = await params;
    const decodedEmail = decodeURIComponent(email);
    const bookings: Booking[] = await BookingService.getBookingsByEmail(email);

    if (!bookings.length) {
        return (
            <div className="container my-5 text-center">
                <h4>No bookings found</h4>
                <p className="text-muted">{decodedEmail}</p>
            </div>
        );
    }

    return (
        <main className="container my-5">
            <div className="mb-4">
                <Link href="/" className="text-decoration-none text-dark fw-semibold">
                    ← Back
                </Link>
            </div>

            <h2 className="fw-bold mb-4">Bookings for {email}</h2>

            <div className="d-flex flex-column gap-3">
                {bookings.map((b) => (
                    <div key={b.id} className="card shadow-sm border-0 p-3">
                        <Link href={`/booking/${b.id}`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="fw-bold mb-1">Booking #{b.id}</h6>
                                    <div className="text-muted small">
                                        {b.startDate.toLocaleDateString()} → {b.endDate.toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="text-end">
                                    <div className="fw-semibold">Total</div>
                                    <div className="fs-5 fw-bold">${b.totalPrice.toFixed(2)}</div>


                                </div>

                            </div>
                        </Link>
                        <Link
                            href={`/product/${b.productId}`}
                            className="btn btn-outline-dark btn-sm mt-2"
                        >
                            View product
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}
