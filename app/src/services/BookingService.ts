import type { Booking } from "@/models/Booking";
import { BookingRepository } from "@/repositories/BookingRepository";

export class BookingService {
    static async getBookingById(id: number) {
        return BookingRepository.getBookingById(id);
    }

    static async submitNewBooking(booking: Omit<Booking, "id">) {
        return BookingRepository.createBooking(booking)
    }

    static async getBookingsByEmail(email: string) {
        return BookingRepository.getBookingsByEmail(email);
    }

}
