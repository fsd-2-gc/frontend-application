import { BookingRepository } from "../repositories/BookingRepository";

export class BookingService {
    static async getBookingById(id: number){
        const data = await BookingRepository.getBookingById(id);

        return data;
    }
}