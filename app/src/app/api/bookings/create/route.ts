import { NextResponse } from "next/server";
import { BookingRepository } from "@/repositories/BookingRepository";
import { Booking } from "@/models/Booking";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Convert date strings back to Date objects as BookingRepository expects them
    const bookingData: Omit<Booking, "id"> = {
      ...body,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    };

    const bookingId = await BookingRepository.createBooking(bookingData);
    
    return NextResponse.json({ data: { booking_id: bookingId } }, { status: 201 });
  } catch (e: any) {
    console.error("Error creating booking in API route:", e);
    return NextResponse.json(
      { error: e?.message ?? "Failed to create booking" },
      { status: 500 }
    );
  }
}
