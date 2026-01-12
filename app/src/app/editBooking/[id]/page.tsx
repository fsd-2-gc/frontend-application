// src/app/editBooking/[id]/page.tsx
import BookingEditForm from "./BookingEditForm";
import { BookingService } from "@/services/BookingService";
import "@/css/createBooking.css";

type PageProps = {
    params: { id: string };
};

export default async function Page({ params }: PageProps) {
    const { id } = await params; // unwrap the promise
    const bookingId = Number(id);

    if (!bookingId || Number.isNaN(bookingId)) {
        return (
            <main className="container my-5">
                <div className="alert alert-danger">Missing or invalid booking ID.</div>
            </main>
        );
    }

    const booking = await BookingService.getBookingById(bookingId);

    if (!booking) {
        return (
            <main className="container my-5">
                <div className="alert alert-danger">Booking not found.</div>
            </main>
        );
    }

    return (
        <main className="container my-5">
            <BookingEditForm initialBooking={booking} />
        </main>
    );
}
