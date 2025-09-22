import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { FormField } from '../../models/form-field';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  form: FormGroup;
  loading = false;
  message: string | null = null;
  success = false;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({});
  }

  ngOnChanges() {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.name] = [
        '',
        field.validators ? field.validators.map(v => {
          switch (v) {
            case 'required': return Validators.required;
            case 'gt0': return Validators.min(0.01);
            default: return null;
          }
        }) : []
      ];
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

    console.log(request);

    this.api.post(this.endpoint, request)
      .subscribe({
        next: async (res) => {
          this.loading = false;
          this.success = true;
          this.message = this.successMessage;
          this.form.reset();
          console.log(res);
          if ((this as any).onSuccess) {
            (this as any).onSuccess();
          }
        },
        error: (err) => {
          this.loading = false;
          this.success = false;
          this.message = err?.error?.message || "Erreur lors de l'envoi";
        }
      });
  }

  getError(fieldName: string, validator: string): boolean {
    const field = this.form.get(fieldName);
    return field?.hasError(validator) && field?.touched || false;
  }
    public reset() {
      this.form.reset();
    }
}
