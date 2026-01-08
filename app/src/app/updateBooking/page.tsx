import UpdateBooking from "@/components/UpdateBooking";
import { BookingService } from "@/services/BookingService";

export default async function BookingPage() {
    const booking = await BookingService.getBookingById(1);

    if (!booking) {
        return <div>Booking not found</div>;
    }

    return (
        <div>
            <h1>Booking #{booking.id}</h1>
            <UpdateBooking booking={booking} />
        </div>
    );
}
