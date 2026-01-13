"use client";

import {Suspense, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import "../../css/booking.css";

function PaymentForm() {
    const searchParams = useSearchParams();
    const bookingId = Number(searchParams.get("bookingId"));

    const [success, setSuccess] = useState(true);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | boolean>(null);

    const handlePayment = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/payment", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({bookingId, success}),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json?.error ?? "Payment failed");
            }

            setResult(true);
        } catch {
            setResult(false);
        } finally {
            setLoading(false);
        }
    };


    if (!bookingId) {
        return (
            <div className="page">
                <div className="alert danger">No booking ID provided.</div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="card">
                <h3 className="title">Payment for Booking #{bookingId}</h3>

                <div className="grid">
                    <div className="col">
                        <label>
                            <input
                                type="radio"
                                checked={success}
                                onChange={() => setSuccess(true)}
                            />
                            Payment Success
                        </label>

                        <label>
                            <input
                                type="radio"
                                checked={!success}
                                onChange={() => setSuccess(false)}
                            />
                            Payment Failed
                        </label>
                    </div>
                </div>

                <button
                    className="btn btn-success"
                    disabled={loading}
                    onClick={handlePayment}
                >
                    {loading ? "Processing..." : "Confirm Payment"}
                </button>

                {result !== null && (
                    <div className={`alert mt-3 ${result ? "alert-success" : "alert-danger"}`}>
                        {result ? "Payment successful!" : "Payment failed!"}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentForm />
        </Suspense>
    );
}
