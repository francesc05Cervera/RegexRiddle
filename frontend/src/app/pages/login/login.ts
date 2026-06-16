import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Compila tutti i campi';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
  next: () => {
    this.isLoading = false;
    this.router.navigate(['/challenges']);
    this.cdr.detectChanges();
  },
  error: (err) => {
    this.errorMessage = err.error?.message || 'Errore durante il login';
    this.isLoading = false;
    this.cdr.detectChanges();
  }
});
  }
}