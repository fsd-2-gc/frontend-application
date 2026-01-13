"use client"

import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import "../css/createBooking.css";

import {BookingService} from "../services/BookingService";
import {Booking, Status} from "../models/Booking";
// Note: fetch product data via internal API to keep repositories server-only

type CreateBookingProps = {
    productId: number;   // automatically injected (recommended)
    resellerId: number;  // automatically injected
};

export default function CreateBooking({productId, resellerId}: CreateBookingProps) {
    const router = useRouter();
    const [customerEmail, setCustomerEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [dailyPrice, setDailyPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Fetch product price automatically (via internal API)
    useEffect(() => {
        async function fetchPrice() {
            try {
                const res = await fetch(`/api/products/${productId}`, {
                    headers: {"Content-Type": "application/json"},
                });
                if (!res.ok) return;
                const json = await res.json();
                const product = json?.data;
                if (product && typeof product.price_per_day === "number") {
                    setDailyPrice(product.price_per_day);
                }
            } catch (_err) {
                // ignore; price will remain 0
            }
        }

        fetchPrice();
    }, [productId]);

    // Automatically calculate total price when dates change
    useEffect(() => {
        if (!startDate || !endDate || !dailyPrice) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

        if (diff > 0) setTotalPrice(diff * dailyPrice);
        else setTotalPrice(0);

    }, [startDate, endDate, dailyPrice]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);

        try {
            const bookingData: Omit<Booking, "id"> = {
                productId,
                resellerId,
                customerEmail,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                totalPrice,
                status: Status.Pending,
            };

            const newId = await BookingService.submitNewBooking(bookingData);

            setSuccessMsg(`Booking created successfully! ID: ${newId}. Redirecting...`);

            setCustomerEmail("");
            setStartDate("");
            setEndDate("");

            // Redirect to the booking details page
            setTimeout(() => {
                router.push(`/booking/${newId}`);
            }, 1500);

        } catch (err: any) {
            setErrorMsg(err.message || "Booking failed.");
        }
    };

    return (
        <div className="page">
            <div className="card">

                <h2 className="title">Create New Booking</h2>

                {successMsg && <div className="alert success">{successMsg}</div>}
                {errorMsg && <div className="alert error">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="formGrid">

                    {/* Start Date & Time */}
                    <div className="field">
                        <label>Start Date & Time</label>
                        <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* End Date & Time */}
                    <div className="field">
                        <label>End Date & Time</label>
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Customer Email */}
                    <div className="field">
                        <label>Customer Email</label>
                        <input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Auto-filled info (read-only) */}
                    <div className="field">
                        <label>Product ID</label>
                        <input type="number" value={productId} readOnly disabled/>
                    </div>

                    <div className="field">
                        <label>Reseller ID</label>
                        <input type="number" value={resellerId} readOnly disabled/>
                    </div>

                    <div className="field">
                        <label>Total Price</label>
                        <input type="number" value={totalPrice} readOnly disabled/>
                    </div>

                    <div className="buttonBar">
                        <button type="submit">Create Booking</button>
                    </div>

                </form>
            </div>
        </div>
    );
}
