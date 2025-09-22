import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { FormField } from '../../models/form-field';
import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, GenericFormComponent],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent {
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;
  constructor(private transactionService: TransactionService) {}
  @Input() userId!: string;

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

  submitLabel = 'Ajouter la transaction';
  endpoint = 'transaction';
  successMessage = 'Transaction ajoutée';
  formTitle = 'Nouvelle transaction';

  handleSuccess = () => {
    this.transactionService.notifyTransactionsChanged();
  }

  resetForm() {
    if (this.genericForm) {
      this.genericForm.reset();
    }
  }
}
