import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  onSubmit() {
  if (!this.username || !this.email || !this.password) {
    this.errorMessage = 'Compila tutti i campi';
    this.cdr.detectChanges();
    return;
  }

  if (!this.email.includes('@') || !this.email.includes('.')) {
    this.errorMessage = 'Inserisci un indirizzo email valido';
    this.cdr.detectChanges();
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  this.authService.register({
    username: this.username,
    email: this.email,
    password: this.password
  }).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.isLoading = false;
      const status = err.status;
      const msg = err.error?.message || err.error || '';

      if (status === 409) {
        this.errorMessage = msg || 'Username o email già in uso.';
        this.cdr.detectChanges();
      } else if (status === 400) {
        this.errorMessage = 'Dati non validi. Controlla i campi.';
        this.cdr.detectChanges();
      } else {
        this.errorMessage = 'Errore durante la registrazione. Riprova.';
        this.cdr.detectChanges();
      }
    }
  });
}
}
