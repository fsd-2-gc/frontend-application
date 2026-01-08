"use client";

import { useState } from "react";
import type { Booking } from "@/models/Booking";

type Props = {
    booking: Booking;
};

export default function UpdateBooking({ booking }: Props) {
    const [loading, setLoading] = useState(false);

    async function handleUpdate() {
        setLoading(true);

        await fetch(`/api/bookings/${booking.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: booking.productId,
                customerEmail: booking.customerEmail,
                resellerId: booking.resellerId,
                startDate: booking.startDate.toISOString(),
                endDate: booking.endDate.toISOString(),
                totalPrice: booking.totalPrice,
            }),
        });

        setLoading(false);
    }

    return (
        <button
            onClick={handleUpdate}
            className="btn btn-outline-primary"
            disabled={loading}
        >
            {loading ? "Updating..." : "Update booking"}
        </button>
    );
}
