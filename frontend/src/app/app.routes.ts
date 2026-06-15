import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'create-challenge',
    loadComponent: () =>
      import('./pages/create-challenge/create-challenge').then(m => m.CreateChallengeComponent)
  },
  {
    path: 'challenges',
    loadComponent: () =>
      import('./pages/challenge-list/challenge-list').then(m => m.ChallengeListComponent)
  },

  { path: '**', redirectTo: 'login' }
];