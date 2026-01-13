"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBookingPage() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            const encodedEmail = encodeURIComponent(email.trim());
            router.push(`/bookings/${encodedEmail}`);
        }
    };

    return (
        <main className="container my-5">
            <h2 className="fw-bold mb-4">Search Booking by Email</h2>

            <form onSubmit={handleSubmit} className="d-flex gap-2">
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    required
                />
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
        </main>
    );
}
