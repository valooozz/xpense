import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionsByMonth } from '../../../models/transactions-by-month';
import { MonthYearFormatPipe } from '../../../shared/pipes/monthYearFormat.pipe';
import { TransactionCardComponent } from '../../../shared/transaction/transaction-card/transaction-card.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionCardComponent, MonthYearFormatPipe],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  @Input() userId!: string;
  @Input() all: boolean = false;
  
  transactionsByMonth: TransactionsByMonth[] = [];
  errorMessage!: string;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadTransactions();
    this.transactionService.getTransactionsChanged().subscribe(() => {
      this.loadTransactions();
    });
  }

  private loadTransactions() {
    this.transactionService.getTransactionsByUser(this.all, this.userId)
      .subscribe({
        next: (res) => {
          this.transactionsByMonth = res;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || "Impossible de récupérer les transactions.";
        }
      });
  }
}
