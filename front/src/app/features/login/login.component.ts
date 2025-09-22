import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../models/user';

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

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
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

    this.api.post<User>('user/login', { username, password })
      .subscribe({
        next: async (res) => {
          this.loading = false;
          await this.router.navigate(['/dashboard', res.id]);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err?.error?.message || "Nom d'utilisateur ou mot de passe incorrect.";
        }
      });
  }
}
