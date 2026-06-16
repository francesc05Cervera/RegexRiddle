import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChallengeService } from '../../services/challenge.service';

@Component({
  selector: 'app-create-challenge',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './create-challenge.html',
  styleUrl: './create-challenge.css'
})
export class CreateChallengeComponent {
  secretRegex = '';
  positiveExample = '';
  negativeExample = '';
  positiveControlsInput = '';
  negativeControlsInput = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private challengeService: ChallengeService,
    private router: Router
  ) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.secretRegex || !this.positiveExample || !this.negativeExample) {
      this.errorMessage = 'Compila tutti i campi obbligatori';
      return;
    }

    const positiveControls = this.positiveControlsInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const negativeControls = this.negativeControlsInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (positiveControls.length === 0 || negativeControls.length === 0) {
      this.errorMessage = 'Inserisci almeno un controllo positivo e uno negativo';
      return;
    }

    this.isLoading = true;

    this.challengeService.createChallenge({
      secretRegex: this.secretRegex,
      positiveExample: this.positiveExample,
      negativeExample: this.negativeExample,
      positiveControls,
      negativeControls
    }).subscribe({
      next: (res) => {
        console.log('SUCCESS', res);

        this.isLoading = false;
        this.successMessage = 'Challenge creata con successo!';
        this.resetForm();

        setTimeout(() => {
          this.router.navigate(['/challenges']);
        }, 800);
      },
      error: (err) => {
        console.log('ERROR', err);
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Errore durante la creazione';
      }
    });
  }

  resetForm() {
    this.secretRegex = '';
    this.positiveExample = '';
    this.negativeExample = '';
    this.positiveControlsInput = '';
    this.negativeControlsInput = '';
  }
}