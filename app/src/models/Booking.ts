export type Booking = {
    id: number,
    productId: number,
    customerEmail: string,
    resellerId: number,
    startDate: Date,
    endDate: Date,
    totalPrice: number,
    status: Status
}

export enum Status {
    Pending = 0,
    Confirmed = 1,
    Paid = 2,
    Cancelled = 3,
    Refunded = 4,
}