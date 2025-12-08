import { BookingRepository } from "../repositories/BookingRepository";
import { Booking } from "@/models/Booking";

export class BookingService {
    static async getBookingById(id: number){
        const data = await BookingRepository.getBookingById(id);

        return data;
    }

    static async submitNewBooking(data: Omit<Booking, "id">){
    return BookingRepository.createBooking(data);
    }
}