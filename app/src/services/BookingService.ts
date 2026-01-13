import type { Booking } from "@/models/Booking";
import { BookingRepository } from "@/repositories/BookingRepository";

export class BookingService {
    static async getBookingById(id: number) {
        if (typeof window !== "undefined") {
            const res = await fetch(`/api/bookings/${id}`);
            const json = await res.json();
            return json.data;
        }
        return BookingRepository.getBookingById(id);
    }

    static async submitNewBooking(booking: Omit<Booking, "id">) {
        if (typeof window !== "undefined") {
            const response = await fetch("/api/bookings/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(booking),
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || "Failed to create booking via client service");
            }

            return json.data.booking_id;
        }
        return BookingRepository.createBooking(booking)
    }

    static async cancelBooking(id: number) {
        return BookingRepository.cancelBooking(id)
    }
}
