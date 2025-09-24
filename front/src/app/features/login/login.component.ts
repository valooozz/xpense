import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  loading = false;
  errorMessage = '';

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    this.loading = true;
    const { username, password } = this.loginForm.value as { username: string; password: string };

    this.api.post<{ message: string }>('auth/login', { username, password })
      .subscribe({
        next: async () => {
          this.loading = false;
          this.toastr.info(`Bonjour ${username} !`);
          await this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error(err?.error?.message || "Nom d'utilisateur ou mot de passe incorrect.")
        }
      });
  }
}
