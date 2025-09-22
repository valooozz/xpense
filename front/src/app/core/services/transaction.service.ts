import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';
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

  getTransactionsByUser(userId: string): Observable<Transaction[]> {
    return this.api.get<Transaction[]>(`transaction/user/${userId}`);
  }
}
