import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getTransactionsByUser(all: boolean, userId: string): Observable<TransactionsByMonth[]> {
    let endpoint = `transaction/user/${userId}`
    if (!all) {
      endpoint += '/last'
    }
    return this.api.get<TransactionsByMonth[]>(endpoint);
  }
}
