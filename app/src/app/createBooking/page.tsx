import CreateBooking from "@/components/CreateBooking";

export default function Page({
    searchParams,
}: {
    searchParams: { productId?: string; resellerId?: string };
}) {
    const productId = Number(searchParams?.productId);
    const resellerId = Number(searchParams?.resellerId ?? 1);

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
