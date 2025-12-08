import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { email: string } }) {
  const email = encodeURIComponent(params.email);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

  const response = await fetch(`${BASE_URL}/getbookings/${email}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
