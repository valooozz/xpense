import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { FormField } from '../../../models/form-field';
import { Transaction } from '../../../models/transaction';
import { GenericFormComponent } from '../../../shared/generic-form/generic-form.component';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, GenericFormComponent],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent implements OnInit {
  @Input() userId!: string;
  @Input() transaction!: Transaction;

  @Output() edited = new EventEmitter<void>();

  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  constructor(private transactionService: TransactionService) {}

  fields: FormField[] = [
    { name: 'title', type: 'text', label: 'Titre', validators: ['required'] },
    { name: 'type', type: 'select', label: 'Type', options: [
      { label: 'Dépense', value: 'EXPENSE' }, 
      { label: 'Revenu', value: 'INCOME' }
    ]},
    { name: 'category', type: 'select', label: 'Catégorie', options: [
      { label: 'Nourriture', value: 'Nourriture' },
      { label: 'Cadeaux', value: 'Cadeaux' }
    ] },
    { name: 'amount', type: 'number', label: 'Montant', validators: ['required', 'gt0'] },
    { name: 'date', type: 'date', label: 'Date' },
  ];

  submitLabel!: string;
  formTitle!: string;
  endpoint = 'transaction';
  successMessage = 'Transaction ajoutée';

  ngOnInit() {
    this.submitLabel = this.transaction === undefined ? 'Ajouter la transaction' : 'Éditer la transaction';
    this.formTitle = this.transaction === undefined ? 'Nouvelle transaction' : 'Édition de transaction'
  }

  handleSuccess() {
    this.edited.emit();
    this.transactionService.notifyTransactionsChanged();
  }

  resetForm(fullReset: boolean = true) {
    if (this.genericForm) {
      this.genericForm.reset(fullReset);
    }
  }
}
