import { BookingService } from "@/services/BookingService";
import { Booking } from "@/models/Booking";
import "@/css/booking.css";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function BookingPage({ params }: PageProps) {
    const { id } = await params;
    const bookingId = Number(id);

    if (!Number.isFinite(bookingId)) {
        return <div className="alert danger">Invalid booking id</div>;
    }

    const data = await BookingService.getBookingById(bookingId);

    if (!data) {
        return <div className="alert danger">Booking not found</div>;
    }

    const booking: Booking = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
    };

    return (
        <div className="page">
            <div className="card">
                <h3 className="title">Booking Details</h3>

                <div className="grid">
                    <div className="col">
                        <p><strong>ID:</strong> {booking.id}</p>
                        <p><strong>Product ID:</strong> {booking.productId}</p>
                        <p><strong>Customer Email:</strong> {booking.customerEmail}</p>
                        <p><strong>Reseller ID:</strong> {booking.resellerId}</p>
                    </div>

                    <div className="col">
                        <p><strong>Start Date:</strong> {booking.startDate.toLocaleString()}</p>
                        <p><strong>End Date:</strong> {booking.endDate.toLocaleString()}</p>
                        <p><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</p>
                        <p><strong>Status:</strong> {booking.status}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
