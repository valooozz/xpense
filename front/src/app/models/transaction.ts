import { TransactionType } from "./transaction-type";

export interface Transaction {
    id: string;
    title: string;
    type: TransactionType;
    category: string;
    amount: number;
    date: Date;
}