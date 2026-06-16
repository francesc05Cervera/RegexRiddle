import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
  { path: '**', redirectTo: 'login' }
];