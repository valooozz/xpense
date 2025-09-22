import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Transaction } from '../../../models/transaction';
import { ModalComponent } from '../../modal/modal.component';
import { DetailedTransactionCardComponent } from '../detailed-transaction-card/detailed-transaction-card.component';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [CommonModule, ModalComponent, DetailedTransactionCardComponent],
  templateUrl: './transaction-card.component.html'
})
export class TransactionCardComponent {
  @Input() transaction!: Transaction;

  showDetailedTransaction = false;

  onOpenDetailedTransaction() {
    this.showDetailedTransaction = true;
  }

  onCloseDetailedTransaction() {
    this.showDetailedTransaction = false;
  }
}
