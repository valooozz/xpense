import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionFormComponent } from '../../../features/transaction/transaction-form/transaction-form.component';
import { Transaction } from '../../../models/transaction';
import { ButtonComponent } from '../../button/button.component';
import { ModalComponent } from '../../modal/modal.component';
import { SpinComponent } from '../../spin/spin.component';

@Component({
  selector: 'app-detailed-transaction-card',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent, SpinComponent, TransactionFormComponent],
  templateUrl: './detailed-transaction-card.component.html',
  styles: ``
})
export class DetailedTransactionCardComponent {
  @Input() transaction!: Transaction;
  
  @Output() deleted = new EventEmitter<void>();

  @ViewChild(TransactionFormComponent) transactionForm!: TransactionFormComponent;

  loading = false;
  message = '';
  showTransactionForm = false;

  constructor(private transactionService: TransactionService) {}

  onOpenTransactionForm() {
    this.showTransactionForm = true;
  }

  onCloseTransactionForm() {
    this.showTransactionForm = false;
    this.resetForm(false);
  }

  resetForm(fullReset: boolean = true) {
    if (this.transactionForm) {
      this.transactionForm.resetForm(fullReset);
    }
  }

  onDeleteTransaction() {
    this.transactionService.deleteTransaction(this.transaction.id)
      .subscribe({
        next: async () => {
          this.loading = false;
          this.transactionService.notifyTransactionsChanged();
          this.deleted.emit();
        },
        error: (err) => {
          this.loading = false;
          this.message = err?.error?.message || "Erreur lors de la suppression de la transaction";
        }
      });
  }
}
