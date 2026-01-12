"use client";

import { useState } from "react";
import { Status } from "@/models/Booking";

type Props = {
    bookingId: number;
};

export default function CancelBookingButton({ bookingId }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleCancel = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/bookings/cancel/${bookingId}`, {
                method: "POST",
            });

            // 👇 DO NOT parse JSON yet
            if (!res.ok) {
                const text = await res.text(); // could be HTML or JSON
                throw new Error(text || "Failed to cancel booking");
            }

            // 👇 Only parse JSON if response is OK
            await res.json();

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (success) return <div className="alert success">Booking cancelled successfully.</div>;

    return (
        <div>
            <button className="btn danger" onClick={handleCancel} disabled={loading}>
                {loading ? "Cancelling..." : "Cancel Booking"}
            </button>
            {error && <p className="alert danger">{error}</p>}
        </div>
    );
}
