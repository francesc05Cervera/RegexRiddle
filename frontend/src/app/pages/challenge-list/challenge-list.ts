import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Challenge, ChallengeService } from '../../services/challenge.service';

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './challenge-list.html'
})
export class ChallengeListComponent implements OnInit {
  challenges: Challenge[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private challengeService: ChallengeService,
    private cdr: ChangeDetectorRef  // ← aggiungi
  ) {}

  ngOnInit(): void {
    this.loadChallenges();
  }

  loadChallenges(): void {
    this.isLoading = true;

    this.challengeService.getAllChallenges().subscribe({
      next: (res) => {
        this.challenges = res;
        this.isLoading = false;
        this.cdr.detectChanges();  // ← aggiungi
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Errore nel caricamento delle challenge';
        this.isLoading = false;
        this.cdr.detectChanges();  // ← aggiungi
      }
    });
  }
}