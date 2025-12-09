import { BookingRepository } from "@/repositories/BookingRepository";
import type { Booking } from "@/models/Booking";

export class BookingService {
    private repository = new BookingRepository();

    async getBookingsByEmail(email: string): Promise<Booking[]> {
        return this.repository.getBookingsByEmail(email);
    }
}
