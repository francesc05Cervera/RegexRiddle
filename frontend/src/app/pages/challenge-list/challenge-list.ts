import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Challenge, ChallengeService } from '../../services/challenge.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './challenge-list.html',
  styleUrl: './challenge-list.css'
})
export class ChallengeListComponent implements OnInit {
  challenges: Challenge[] = [];
  isLoading = false;
  errorMessage = '';

constructor(
  private challengeService: ChallengeService,
  private cdr: ChangeDetectorRef,
  private authService: AuthService,
  private router: Router
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

  logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}

}