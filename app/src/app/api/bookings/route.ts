import { NextResponse } from "next/server";
import { BookingRepository } from "@/repositories/BookingRepository";
import type { Booking } from "@/models/Booking";

// POST /api/bookings
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Expecting client to send fields similar to Booking (dates may be strings)
    const bookingInput: Omit<Booking, "id"> = {
      productId: Number(body.productId),
      resellerId: Number(body.resellerId),
      customerEmail: String(body.customerEmail),
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      totalPrice: Number(body.totalPrice),
      status: body.status,
    };

    const newId = await BookingRepository.createBooking(bookingInput);

    return NextResponse.json({ booking_id: newId }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to create booking" },
      { status: 500 }
    );
  }
}
