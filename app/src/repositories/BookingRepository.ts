import type { Booking } from "@/models/Booking";

export class BookingRepository {
    private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
    private apiKey = process.env.NEXT_PUBLIC_API_KEY!;

    async getBookingsByEmail(email: string): Promise<Booking[]> {
        const encoded = encodeURIComponent(email);

        const response = await fetch(
            `${this.baseUrl}/getbookings/${encoded}/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": this.apiKey
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch bookings");
        }

        const data = await response.json();
        return data.data as Booking[];
    }
}
