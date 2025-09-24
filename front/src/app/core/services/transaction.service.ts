import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { TransactionsByMonth } from '../../models/transactions-by-month';
import { ApiService } from './api.service';

@Injectable({ 
    providedIn: 'root' 
})
export class TransactionService {
  private transactionsChanged = new BehaviorSubject<void>(undefined);

  constructor(private api: ApiService) {}

  getTransactionsChanged(): Observable<void> {
    return this.transactionsChanged.asObservable();
  }

  notifyTransactionsChanged(): void {
    this.transactionsChanged.next();
  }

  getTransactionsByUser(all: boolean): Observable<TransactionsByMonth[]> {
    let endpoint = `transaction/user`
    if (!all) {
      endpoint += '/last'
    }
    return this.api.get<TransactionsByMonth[]>(endpoint);
  }

  getTransactionsByUserForExport(): Observable<Transaction[]> {
    return this.api.get<Transaction[]>('transaction/user/export');
  }

  deleteTransaction(transactionId: string): Observable<void> {
    return this.api.delete(`transaction/${transactionId}`);
  }
}
