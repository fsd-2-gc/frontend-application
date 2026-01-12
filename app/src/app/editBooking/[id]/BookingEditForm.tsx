"use client";

import React, { useState, useEffect } from "react";
import { BookingService } from "@/services/BookingService";
import { Booking, Status } from "@/models/Booking";

type BookingEditFormProps = {
    initialBooking: Booking;
};

export default function BookingEditForm({ initialBooking }: BookingEditFormProps) {
    const [booking, setBooking] = useState<Booking>(initialBooking);
    const [totalPrice, setTotalPrice] = useState(initialBooking.totalPrice);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Update total price automatically based on start/end dates
    useEffect(() => {
        if (!booking.startDate || !booking.endDate) return;
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        if (diff > 0) setTotalPrice(diff * (booking.totalPrice / diff));
    }, [booking.startDate, booking.endDate]);

    const handleChange = (field: keyof Booking, value: any) => {
        setBooking({ ...booking, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMsg(null);
        setErrorMsg(null);

        try {
            await BookingService.updateBooking(booking.id, booking);
            setSuccessMsg("Booking updated successfully!");
        } catch (err: any) {
            setErrorMsg(err.message || "Update failed.");
        } finally {
            setSaving(false);
        }
    };

    const formatDateTimeLocal = (date: Date) =>
        new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);

    return (
        <div className="page">
            <div className="card">
                <h2 className="title">Edit Booking #{booking.id}</h2>

                {successMsg && <div className="alert success">{successMsg}</div>}
                {errorMsg && <div className="alert error">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="formGrid">

                    <div className="field">
                        <label>Start Date & Time</label>
                        <input
                            type="datetime-local"
                            value={formatDateTimeLocal(booking.startDate)}
                            onChange={(e) => handleChange("startDate", new Date(e.target.value))}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>End Date & Time</label>
                        <input
                            type="datetime-local"
                            value={formatDateTimeLocal(booking.endDate)}
                            onChange={(e) => handleChange("endDate", new Date(e.target.value))}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Customer Email</label>
                        <input
                            type="email"
                            value={booking.customerEmail}
                            onChange={(e) => handleChange("customerEmail", e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Product ID</label>
                        <input type="number" value={booking.productId} readOnly disabled />
                    </div>

                    <div className="field">
                        <label>Reseller ID</label>
                        <input type="number" value={booking.resellerId} readOnly disabled />
                    </div>

                    <div className="field">
                        <label>Total Price</label>
                        <input type="number" value={totalPrice} readOnly disabled />
                    </div>

                    <div className="field">
                        <label>Status</label>
                        <select
                            value={booking.status}
                            onChange={(e) => handleChange("status", Number(e.target.value))}
                        >
                            {Object.entries(Status)
                                .filter(([_, v]) => typeof v === "number")
                                .map(([key, value]) => (
                                    <option key={key} value={value as number}>
                                        {key}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="buttonBar">
                        <button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Update Booking"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
