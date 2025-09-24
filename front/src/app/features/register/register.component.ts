import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private api: ApiService, private toastr: ToastrService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const { username, password } = this.registerForm.value as { username: string; password: string };

    this.api.post<{ message: string }>('auth/register', { username, password })
      .subscribe({
        next: async () => {
          this.loading = false;
          this.toastr.success('Compte créé. Vous pouvez maintenant vous connecter.');
          await this.router.navigate(['/login']);
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error(err?.error?.message || "Impossible de créer le compte, veuillez réessayer ultérieurement.")
        }
      });
  }
}
