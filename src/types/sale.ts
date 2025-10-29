import { Payments } from "@prisma/client";

export interface SaleItemInput {
    productId: string;
    quantity: number;
    price: number;
}

export interface CreateSaleInput {
    userId: string;
    customerId?: string | null;
    totalAmount: number;
    paymentMethod: Payments; 
    transactionDate: Date;
    saleItems: SaleItemInput[];
}