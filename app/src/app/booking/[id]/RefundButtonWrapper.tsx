"use client";

import RefundButton from "@/components/RefundButton";

export default function RefundButtonWrapper({ bookingId }: { bookingId: number }) {
    return <RefundButton bookingId={bookingId} />;
}
