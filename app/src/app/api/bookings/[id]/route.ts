import { NextResponse } from "next/server";
import { BookingRepository } from "@/repositories/BookingRepository";

// GET /api/bookings/:id
export async function GET(
  _req: Request,
  ctx: { params: { id: string } }
) {
  try {
    const id = Number(ctx.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const booking = await BookingRepository.getBookingById(id);
    if (!booking) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ data: booking }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to load booking" },
      { status: 500 }
    );
  }
}
