import { useEffect, useState } from "react";

interface Booking {
  id: number;
  product: string;
  start_date: string;
  end_date: string;
  total_price: number;
}

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const email = "rubenwassenberg@gmail.com"; // of uit je auth/context

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/getbookings/${encodeURIComponent(email)}/`,
          {
            headers: {
              "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY!,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [email]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Bookings</h1>
      <ul>
        {bookings.map((b) => (
          <li key={b.id}>
            {b.product} | {b.start_date} - {b.end_date} | ${b.total_price}
          </li>
        ))}
      </ul>
    </div>
  );
}
