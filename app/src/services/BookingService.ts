import type { Booking } from "@/models/Booking";
import { BookingRepository } from "@/repositories/BookingRepository";

export class BookingService {
    private repository = new BookingRepository();

    async getBookingsByEmail(email: string): Promise<Booking[]> {
        return this.repository.getBookingsByEmail(email);
    }
}
