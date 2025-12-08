export interface Booking {
    id: number,
    productId: number,
    customerEmail: string,
    resellerId: number,
    startDate: Date,
    endDate: Date,
    totalPrice: number,
    status: Status
}

enum Status {
    Pending,
    Confirmed = 2,
    Cancelled,
    Refunded
}