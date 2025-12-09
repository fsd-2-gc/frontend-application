import { NextResponse } from "next/server";
import { ProductRepository } from "@/repositories/ProductRepository";

// GET /api/products/:id
export async function GET(
  _req: Request,
  ctx: { params: { id: string } }
) {
  try {
    const id = Number(ctx.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const product = await ProductRepository.getProduct(id);
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ data: product }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to load product" },
      { status: 500 }
    );
  }
}
