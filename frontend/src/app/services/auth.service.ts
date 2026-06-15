import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: { username: string; email: string; password: string }) {
    return this.http.post<any>('/auth/register', data).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>('/auth/login', data).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}