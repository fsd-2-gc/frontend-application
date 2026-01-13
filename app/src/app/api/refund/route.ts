import { NextResponse } from "next/server";
import { PaymentRepository } from "@/repositories/PaymentRepository";

export async function POST(req: Request) {
    const { bookingId } = await req.json();

    try {
        const result = await PaymentRepository.refund(bookingId);

        return NextResponse.json(result, { status: 200 });
    } catch (e: any) {
        console.error("Refund error:", e.message);
        return NextResponse.json(
            { error: e.message },
            { status: 400 }
        );
    }
}