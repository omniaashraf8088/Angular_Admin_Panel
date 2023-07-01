export interface IOrder {
    id: string;
    date: Date;
    userId: string;
    status: OrderStatus;
}

export enum OrderStatus {
    Approved = 1,
    Canceled  = 2,
    Rejected = 3
}