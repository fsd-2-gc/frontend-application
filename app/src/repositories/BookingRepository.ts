import type { Booking } from "../models/Booking";

export class BookingRepository {
    private static get BASE_URL() {
        return process.env.API_BASE_URL as string;
    }

    private static get API_KEY() {
        return process.env.API_KEY as string;
    }

    static async getBookingById(id: number) {
        if (!Number.isFinite(id as number) || id <= 0) {
            return null;
        }

        /* const url = `${this.BASE_URL}/getBooking/${id}/`;


        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.API_KEY,
            }
        })

        const json = await response.json();

        let bookingData = json.data;

        const booking: Booking = {
            id: bookingData.id,
            productId: bookingData.productId,
            customerEmail: bookingData.customerEmail,
            resellerId: bookingData.resellerId,
            startDate: new Date(bookingData.startDate),
            endDate: new Date(bookingData.endDate),
            totalPrice: bookingData.totalPrice,
            status: bookingData.Status,
        } 
        const booking: Booking = {
        booking.id = 1;
        booking.productId = 1;
        booking.customerEmail = "hallo@E.com"
        booking.resellerId = 1;
        booking.startDate = new Date("2025-12-08");
        booking.endDate = new Date("2025-12-09");
        booking.totalPrice = 30.50;
        booking.status = bookingData.Status.Confirmed;
        }
        

        return booking
        */

        const booking: Booking = {
            id: 1,
            productId: 1,
            customerEmail: "e",
            resellerId: 1,
            startDate: new Date("2025-12-08"),
            endDate: new Date("2025-12-09"),
            totalPrice: 1,
            status: 2
        }

       return booking
    }
}
