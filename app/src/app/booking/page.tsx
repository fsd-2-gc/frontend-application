"use client";

import { useState } from "react";
import type { Booking } from "@/models/Booking";
import { BookingService } from "@/services/BookingService";

const service = new BookingService();

export default function BookingListPage() {
    const [email, setEmail] = useState("");
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBookings = async () => {
        if (!email) return;
        setLoading(true);
        try {
            const data = await service.getBookingsByEmail(email);
            setBookings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column gap-3">
            <div className="mb-3 d-flex gap-2 align-items-center">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter customer email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-dark" onClick={fetchBookings}>
                    Search
                </button>
            </div>

            {loading && <div>Loading...</div>}

            {bookings.map((b) => (
                <div key={b.booking_id} className="card shadow-sm border-0 rounded-3 p-3">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                            <h5 className="fw-semibold mb-1">{b.product_id}</h5>
                            <div className="text-muted small mb-2">{b.customer_email}</div>
                        </div>

                        <div className="col-md-3">
                            <div>
                                {b.start_date} → {b.end_date}
                            </div>
                        </div>

                        <div className="col-md-3 text-end">
                            <div className="fw-semibold">Total</div>
                            <div className="fs-5 fw-bold">${Number(b.total_price).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            ))}

            {!loading && bookings.length === 0 && email && (
                <div className="text-muted">No bookings found for this email.</div>
            )}
        </div>
    );
}
