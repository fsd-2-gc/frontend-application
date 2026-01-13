    "use client";

    import { useState } from "react";

    type Props = {
        bookingId: number;
    };

    export default function RefundButton({ bookingId }: Props) {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        const refund = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(
                    "/api/refund",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ bookingId }),
                    }
                );


                const json = await res.json();

                if (!res.ok) {
                    throw new Error(json?.data ?? "Refund failed");
                }

                window.location.reload();
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        return (
            <>
                <button
                    className="btn btn-danger"
                    onClick={refund}
                    disabled={loading}
                >
                    {loading ? "Refunding..." : "Refund booking"}
                </button>

                {error && <div className="alert danger">{error}</div>}
            </>
        );
    }
