import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Transaction } from '../../../models/transaction';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-detailed-transaction-card',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './detailed-transaction-card.component.html',
  styles: ``
})
export class DetailedTransactionCardComponent {
  @Input() transaction!: Transaction;

  showTransactionForm = false;

  onOpenTransactionForm() {
    this.showTransactionForm = true;
  }

  onCloseTransactionForm() {
    this.showTransactionForm = false;
  }
}
