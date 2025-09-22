import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../models/transaction';
import { ButtonComponent } from '../../button/button.component';
import { ModalComponent } from '../../modal/modal.component';
import { SpinComponent } from '../../spin/spin.component';

@Component({
  selector: 'app-detailed-transaction-card',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent, SpinComponent],
  templateUrl: './detailed-transaction-card.component.html',
  styles: ``
})
export class DetailedTransactionCardComponent {
  @Input() transaction!: Transaction;
  @Output() deleted = new EventEmitter<void>();

  loading = false;
  message = '';
  showTransactionForm = false;

  constructor(private api: ApiService, private transactionService: TransactionService) {}

  onOpenTransactionForm() {
    this.showTransactionForm = true;
  }

  onCloseTransactionForm() {
    this.showTransactionForm = false;
  }

  onDeleteTransaction() {
    this.api.delete(`transaction/${this.transaction.id}`)
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
