import { BookingRepository } from "../repositories/BookingRepository";
import type { Booking } from "@/models/Booking";

const repo = new BookingRepository();

export class BookingService {
    static async getBookingById(id: number) {
        return repo.getBookingById(id);
    }

    static async submitNewBooking(data: Omit<Booking, "id">) {
        return repo.createBooking(data);
    }
}
