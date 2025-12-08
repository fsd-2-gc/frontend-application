"use client"

import { useState, useEffect } from "react";
import { BookingService } from "../services/BookingService"
import { Booking } from "../models/Booking";
import "../css/booking";

export default function BookingByIdPage() {
  const [bookingId] = useState<number>(1);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    setLoading(true);
    setError(null);
    setBooking(null);

    try {
      const data = await BookingService.getBookingById(bookingId);
      setBooking(data);
    } catch (err: any) {
      setError(err.message || "Failed to load booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {loading && <div className="alert info">Loading booking...</div>}
      {error && <div className="alert danger">{error}</div>}

      {booking && (
        <div className="card">
          <h3 className="title">Booking Details</h3>

          <div className="grid">
            <div className="col">
              <p><strong>ID:</strong> {booking.id}</p>
              <p><strong>Product ID:</strong> {booking.productId}</p>
              <p><strong>Customer Email:</strong> {booking.customerEmail}</p>
              <p><strong>Reseller ID:</strong> {booking.resellerId}</p>
            </div>

            <div className="col">
              <p><strong>Start Date:</strong> {booking.startDate.toLocaleString()}</p>
              <p><strong>End Date:</strong> {booking.endDate.toLocaleString()}</p>
              <p><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}