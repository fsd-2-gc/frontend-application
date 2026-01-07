import type { Booking } from "@/models/Booking";
import { BookingRepository } from "@/repositories/BookingRepository";

export class BookingService {
    static async getBookingById(id: number) {
        if (!Number.isFinite(id as number) || id <= 0) return null;

        const res = await fetch(`/api/bookings/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    }

    static async submitNewBooking(data: Omit<Booking, "id">) {
        const res = await fetch(`/api/bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: data.productId,
                resellerId: data.resellerId,
                customerEmail: data.customerEmail,
                startDate: data.startDate,
                endDate: data.endDate,
                totalPrice: data.totalPrice,
                status: data.status,
            }),
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok || typeof json?.booking_id === "undefined") {
            throw new Error(String(json?.error ?? "Failed to create booking"));
        }

        return Number(json.booking_id);
    }

    static async cancelBooking(id: number){
        return BookingRepository.cancelBooking(id)
    }
}
