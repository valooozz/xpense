import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../../models/transaction';
import { TransactionCardComponent } from '../../shared/transaction-card/transaction-card.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionCardComponent],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  @Input() userId!: string;
  @Input() nbToShow: number = 4;
  
  transactions: Transaction[] = [];
  errorMessage!: string;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadTransactions();
    this.transactionService.getTransactionsChanged().subscribe(() => {
      this.loadTransactions();
    });
  }

  private loadTransactions() {
    this.transactionService.getTransactionsByUser(this.userId)
      .subscribe({
        next: (res) => {
          if (this.nbToShow === 0) {
            this.transactions = res;
          } else {
            this.transactions = res.slice(0, this.nbToShow)
          }
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || "Impossible de récupérer les transactions.";
        }
      });
  }
}
