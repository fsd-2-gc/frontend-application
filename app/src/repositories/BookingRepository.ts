import type { Booking } from "@/models/Booking";

export class BookingRepository {
    private baseUrl = process.env.API_BASE_URL!;
    private apiKey = process.env.API_KEY!;


private getFullUrl(path: string) {
    return path;
}


    async getBookingsByEmail(email: string): Promise<Booking[]> {
        const encodedEmail = encodeURIComponent(email);
        const url = this.getFullUrl(`${this.baseUrl}/getbookings/${encodedEmail}/`);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.apiKey
            }
        });

        if (!response.ok) {
            const text = await response.text();
            if (text.startsWith("<!")) {
                console.error("SERVER RETURNED HTML:", text);
                throw new Error(`Backend returned HTML (status ${response.status})`);
            }
            try {
                const errorData = JSON.parse(text);
                throw new Error(errorData.error || `Failed to fetch bookings (status ${response.status})`);
            } catch {
                throw new Error(`Failed to fetch bookings (invalid JSON, status ${response.status})`);
            }
        }

        const data = await response.json();
        return data.data as Booking[];
    }
}
