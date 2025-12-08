import CreateBooking from "@/components/CreateBooking";

export default function Page({ params }: { params: { productId: string } }) {
    return (
        <main className="container my-5">
            <CreateBooking
                productId={1}
                resellerId={1}
            />
        </main>
    );
}
