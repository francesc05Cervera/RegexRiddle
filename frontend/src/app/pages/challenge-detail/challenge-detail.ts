import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChallengeService } from '../../services/challenge.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-challenge-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './challente-details.html',
  styleUrl: './challenge-detail.css'
})
export class ChallengeDetailComponent implements OnInit {
  challenge: any = null;
  isLoading = true;
  errorMessage = '';

  userRegex = '';
  attemptResult: { passed: boolean; results: any[] } | null = null;
  attemptError = '';
  isSubmitting = false;

  currentUserId: number | null = null;

  get isOwner(): boolean {
    return !!this.challenge &&
      this.currentUserId !== null &&
      this.challenge.authorId === this.currentUserId;
  }

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();

    const id = this.route.snapshot.paramMap.get('id')!;
    this.challengeService.getChallengeById(id).subscribe({
      next: (data) => {
        this.challenge = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Challenge non trovata';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  submitAttempt(): void {
    if (!this.userRegex || this.isOwner) return;

    this.isSubmitting = true;
    this.attemptResult = null;
    this.attemptError = '';

    this.challengeService.submitAttempt(this.challenge.id, this.userRegex).subscribe({
      next: (res) => {
        this.attemptResult = res;
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.attemptError = err.error?.message || 'Errore nella verifica';
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }
}