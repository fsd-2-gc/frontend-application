import { NextResponse } from "next/server";
import { PaymentRepository } from "@/repositories/PaymentRepository";

export async function POST(req: Request) {
    const { bookingId, success } = await req.json();

    try {
        const result = success
            ? await PaymentRepository.markPaid(bookingId)
            : await PaymentRepository.refund(bookingId);

        return NextResponse.json(result, { status: 200 });
    } catch (e: any) {
            console.error("Payment error:", e.message);
        return NextResponse.json(
            { error: e.message },
            { status: 400 }
        );
    }
}
