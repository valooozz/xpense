import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { FormField } from '../../models/form-field';
import { SpinComponent } from '../spin/spin.component';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinComponent],
  templateUrl: './generic-form.component.html',
})
export class GenericFormComponent {
  @Input() fields: FormField[] = [];
  @Input() submitLabel: string = 'Ajouter';
  @Input() endpoint: string = '';
  @Input() successMessage: string = 'Formulaire soumis avec succès';
  @Input() userId!: string;
  @Input() formTitle!: string;
  @Input() onSuccess?: () => void;
  @Input() initialValues: { [key: string]: any } = {};
  @Input() edit: boolean = false;

  form: FormGroup;
  loading = false;
  message: string | null = null;
  success = false;
  private initialized = false;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.formatAndVerifyFields();
    this.initialized = true;
  }

  ngOnChanges(changes: any) {
    if (!this.initialized) return;
    if (changes.fields || changes.initialValues) {
      this.formatAndVerifyFields();
    }
  }

  formatAndVerifyFields() {
    const group: any = {};
    this.fields.forEach(field => {
      let value = (this.initialValues && this.initialValues.hasOwnProperty(field.name)) ? this.initialValues[field.name] : '';
      if (field.type === 'date' && value) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          value = date.toISOString().slice(0, 10);
        }
      }
      const validators = field.validators ? field.validators.map(v => {
        switch (v) {
          case 'required': return Validators.required;
          case 'gt0': return Validators.min(0.01);
          default: return null;
        }
      }).filter(Boolean) : [];
      group[field.name] = [value, validators];
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.message = null;

    const request = {
      ...this.form.value,
      userId: this.userId
    }

    if (this.edit) {
      this.api.put(`${this.endpoint}/${this.initialValues['id']}`, request)
        .subscribe({
          next: async () => {
            this.loading = false;
            this.success = true;
            this.message = this.successMessage;
            this.form.reset();
            if (this.onSuccess) {
              this.onSuccess();
            }
          },
          error: (err) => {
            this.loading = false;
            this.success = false;
            this.message = err?.error?.message || "Erreur lors de l'envoi";
          }
        });
    } else { // create
      this.api.post(this.endpoint, request)
        .subscribe({
          next: async () => {
            this.loading = false;
            this.success = true;
            this.message = this.successMessage;
            this.form.reset();
            if (this.onSuccess) {
              this.onSuccess();
            }
          },
          error: (err) => {
            this.loading = false;
            this.success = false;
            this.message = err?.error?.message || "Erreur lors de l'envoi";
          }
        });
    }
  }

  getError(fieldName: string, validator: string): boolean {
    const field = this.form.get(fieldName);
    return field?.hasError(validator) && field?.touched || false;
  }
  
  public reset(fullReset: boolean = true) {
    if (fullReset) {
      this.form.reset();
    } else {
      this.formatAndVerifyFields();
      this.message = null;
    }
  }
}
