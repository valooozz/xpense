import { TransactionType } from "./transaction-type";

export interface Transaction {
    id: string;
    title: string;
    type: TransactionType;
    categoryId: number;
    category: string;
    amount: number;
    date: Date;
}