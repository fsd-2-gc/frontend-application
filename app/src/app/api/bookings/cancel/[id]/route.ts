import { NextResponse } from "next/server";
import { BookingService } from "@/services/BookingService";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;   // 👈 IMPORTANT
    const bookingId = Number(id);

    if (!Number.isFinite(bookingId)) {
        return NextResponse.json(
            { error: "Invalid booking id" },
            { status: 400 }
        );
    }

    try {
        await BookingService.cancelBooking(bookingId);

        return NextResponse.json({ ok: true, id });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to cancel booking" },
            { status: 500 }
        );
    }
}
