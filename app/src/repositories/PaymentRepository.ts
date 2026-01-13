export class PaymentRepository {
    private static get BASE_URL() {
        return process.env.API_BASE_URL as string;
    }

    private static get API_KEY() {
        return process.env.API_KEY as string;
    }

static async markPaid(bookingId: number) {
    const url = `${this.BASE_URL}/bookings/${bookingId}/mark-paid/`;
    console.log("Calling Django:", url);

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-API-KEY": this.API_KEY,
        },
    });

    const json = await res.json();

    console.log("Django response:", res.status, json);

    if (!res.ok || json.status !== "ok") {
        throw new Error(json?.data ?? "Failed to mark booking as paid");
    }

    return json;
}


    static async refund(bookingId: number) {
        const res = await fetch(
            `${this.BASE_URL}/bookings/${bookingId}/refund/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-API-KEY": this.API_KEY,
                },
            }
        );

        const json = await res.json();

        if (!res.ok || json.status !== "ok") {
            throw new Error(json?.data ?? "Failed to refund booking");
        }

        return json;
    }
}
