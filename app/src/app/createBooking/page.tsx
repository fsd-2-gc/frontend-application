import CreateBooking from "@/components/CreateBooking";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ productId?: string; resellerId?: string }>;
}) {
    const { productId: productIdParam, resellerId: resellerIdParam } = await searchParams;
    const productId = Number(productIdParam);
    const resellerId = Number(resellerIdParam ?? 1);

    if (!productId || Number.isNaN(productId)) {
        return (
            <main className="container my-5">
                <div className="alert alert-danger">Missing or invalid productId.</div>
            </main>
        );
    }

    return (
        <main className="container my-5">
            <CreateBooking productId={productId} resellerId={resellerId} />
        </main>
    );
}
