import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: '', 
    loadComponent: () => import('./pages/landing/landing').then(m => m.LandingComponent) 
  },

  { path: 'come-si-gioca', 
    loadComponent: () => import('./pages/come-si-gioca/come-si-gioca').then(m => m.ComeSiGiocaComponent) 
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'challenges',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/challenge-list/challenge-list').then(m => m.ChallengeListComponent)
  },
  {
    path: 'challenges/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/challenge-detail/challenge-detail').then(m => m.ChallengeDetailComponent)
  },
  {
    path: 'create-challenge',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/create-challenge/create-challenge').then(m => m.CreateChallengeComponent)
  },

  {
  path: 'leaderboard',
  canActivate: [authGuard],
  loadComponent: () => import('./pages/leaderboard/leaderboard').then(m => m.LeaderboardComponent)
},
  { path: '**', redirectTo: 'login' }
];