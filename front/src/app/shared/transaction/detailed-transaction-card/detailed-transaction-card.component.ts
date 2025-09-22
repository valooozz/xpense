import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../models/transaction';
import { ButtonComponent } from '../../button/button.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-detailed-transaction-card',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent],
  templateUrl: './detailed-transaction-card.component.html',
  styles: ``
})
export class DetailedTransactionCardComponent {
  @Input() transaction!: Transaction;

  @Output() deleted = new EventEmitter<void>();

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
        next: async (res) => {
          // this.loading = false;
          // this.success = true;
          // this.message = this.successMessage;
          // this.form.reset();
          console.log(res);
          this.transactionService.notifyTransactionsChanged();
          this.deleted.emit();
          if ((this as any).onSuccess) {
            (this as any).onSuccess();
          }
        },
        error: (err) => {
          console.error(err);
          // this.loading = false;
          // this.success = false;
          // this.message = err?.error?.message || "Erreur lors de l'envoi";
        }
      });
  }
}
