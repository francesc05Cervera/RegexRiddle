import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChallengePayload {
  secretRegex: string;
  positiveExample: string;
  negativeExample: string;
  positiveControls: string[];
  negativeControls: string[];
}

export interface Challenge {
  id: string;
  positiveExample: string;
  negativeExample: string;
  authorId?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ChallengeService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  createChallenge(data: ChallengePayload) {
    return this.http.post<any>(`${this.apiUrl}/challenge`, data);
  }

  getAllChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.apiUrl}/challenge`);
  }

  getChallengeById(id: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/challenge/${id}`);
}

submitAttempt(id: string, regex: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/challenge/${id}/attempt`, { regex });
}

getLeaderboard(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/challenge/leaderboard`);
}
}