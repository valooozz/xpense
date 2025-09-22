import { Component, Input, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';

@Component({
  selector: 'app-transaction-manager',
  imports: [ButtonComponent, TransactionListComponent, TransactionFormComponent, ModalComponent],
  templateUrl: './transaction-manager.component.html',
  styles: ``
})
export class TransactionManagerComponent {
  @Input() userId!: string;
  
  showTransactionForm = false;
  showAllTransactions = false;
  
  @ViewChild(TransactionFormComponent) transactionFormComponent?: TransactionFormComponent;

  onOpenTransactionForm() {
    this.showTransactionForm = true;
  }

  onCloseTransactionForm() {
    this.showTransactionForm = false;
    if (this.transactionFormComponent) {
      this.transactionFormComponent.resetForm();
    }
  }

  onOpenAllTransactions() {
    this.showAllTransactions = true;
  }

  onCloseAllTransactions() {
    this.showAllTransactions = false;
  }
}
