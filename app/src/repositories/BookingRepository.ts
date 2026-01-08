import type { Booking } from "@/models/Booking";

type BookingWritePayload = Omit<Booking, "id" | "status">;

export class BookingRepository {
    private static get BASE_URL() {
        return process.env.API_BASE_URL as string;
    }

    private static get API_KEY() {
        return process.env.API_KEY as string;
    }

    static async getBookingById(id: number): Promise<Booking | null> {
        if (!Number.isFinite(id) || id <= 0) {
            return null;
        }

        const url = `${this.BASE_URL}/getbooking/${id}/`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-API-KEY": this.API_KEY,
            },
        });

        const json = await response.json();

        if (!response.ok || !json?.data) {
            console.error("Booking ophalen mislukt:", json);
            return null;
        }

        return this.mapBooking(json.data);
    }

    static async createBooking(booking: Omit<Booking, "id">): Promise<number> {
        const url = `${this.BASE_URL}/createbooking/`;

        const payload = {
            product_id: booking.productId,
            customer_email: booking.customerEmail,
            reseller_id: booking.resellerId,
            start_date: booking.startDate.toISOString(),
            end_date: booking.endDate.toISOString(),
            total_price: Number(booking.totalPrice),
            status: booking.status,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-API-KEY": this.API_KEY,
            },
            body: JSON.stringify(payload),
        });

        const json = await response.json();

        if (!response.ok || !json?.data?.booking_id) {
            console.error("Booking maken mislukt:", json);
            throw new Error(String(json?.data ?? "Failed to create booking"));
        }

        return Number(json.data.booking_id);
    }

    static async updateBooking(bookingId: number, booking: BookingWritePayload): Promise<number> {
        if (!Number.isFinite(bookingId) || bookingId <= 0) {
            throw new Error("Invalid booking id");
        }

        const url = `${this.BASE_URL}/updatebooking/${bookingId}/`;

        const payload = {
            product_id: booking.productId,
            customer_email: booking.customerEmail,
            reseller_id: booking.resellerId,
            start_date: booking.startDate.toISOString(),
            end_date: booking.endDate.toISOString(),
            total_price: Number(booking.totalPrice),
        };

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-API-KEY": this.API_KEY,
            },
            body: JSON.stringify(payload),
        });

        const json = await response.json();

        if (!response.ok || !json?.data?.booking_id) {
            console.error("Booking updaten mislukt:", json);
            throw new Error(String(json?.data ?? "Failed to update booking"));
        }

        return Number(json.data.booking_id);
    }

    private static mapBooking(b: any): Booking {
        return {
            id: Number(b.id ?? b.booking_id),
            productId: b.product_id,
            customerEmail: b.customer_email,
            resellerId: b.reseller_id,
            startDate: new Date(b.start_date),
            endDate: new Date(b.end_date),
            totalPrice: Number(b.total_price),
            status: b.status,
        };
    }
}
