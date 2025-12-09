import type { Booking } from "../models/Booking";

export class BookingRepository {
    private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
    private apiKey = process.env.NEXT_PUBLIC_API_KEY!;

    async getBookingById(id: number): Promise<Booking | null> {
        if (!Number.isFinite(id) || id <= 0) {
            return null;
        }

        const url = `${this.baseUrl}/getbooking/${id}/`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.apiKey,
            },
        });

        const text = await response.text();

        if (text.startsWith("<!")) {
            console.error("SERVER RETURNED HTML:", text);
            throw new Error("Backend returned HTML (403/404)");
        }

        const json = JSON.parse(text);

        if (!response.ok || !json?.data) {
            console.error("Booking ophalen mislukt:", json);
            return null;
        }

        return this.mapBooking(json.data);
    }

async createBooking(booking: Omit<Booking, "id">) {
    const url = `${this.baseUrl}/createbooking/`;

    const payload = {
        product_id: booking.productId,
        customer_email: booking.customerEmail,
        reseller_id: booking.resellerId,
        start_date: booking.startDate.toISOString().split("T")[0],
        end_date: booking.endDate.toISOString().split("T")[0],
        total_price: Number(booking.totalPrice),
        status: booking.status,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": this.apiKey,
        },
        body: JSON.stringify(payload),
    });

    const text = await response.text();
    let json: any = {};
    try {
        json = JSON.parse(text);
    } catch {
        console.error("SERVER RETURNED NON-JSON:", text);
        throw new Error("Backend returned invalid JSON");
    }

    if (!response.ok) {
        console.error("Booking maken mislukt:", json);
        throw new Error(json.data ?? "Failed to create booking"); // ✅ fix hier
    }

    const data = json.data;

    return {
        id: Number(data.booking_id),
        productId: data.product_id,
        customerEmail: data.customer_email,
        resellerId: data.reseller_id,
        startDate: new Date(data.start_date),
        endDate: new Date(data.end_date),
        totalPrice: Number(data.total_price),
        status: data.status,
    };
}

    private mapBooking(b: any): Booking {
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
