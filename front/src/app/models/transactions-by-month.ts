import { Transaction } from "./transaction";

export interface TransactionsByMonth {
    month: string;
    transactions: Transaction[]
}