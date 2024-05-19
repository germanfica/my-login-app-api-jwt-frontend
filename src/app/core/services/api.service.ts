// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{ token: string }> {
    const url = `${this.apiUrl}/login`;
    const body = { username, password };
    return this.http.post<{ token: string }>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  signup(username: string, password: string, displayName: string, email: string): Observable<User> {
    const url = `${this.apiUrl}/signup`;
    const body = { username, password, displayName, email };
    return this.http.post<User>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  getProfile(token: string): Observable<any> {
    const url = `${this.apiUrl}/profile`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    // Manejo de errores personalizado
    console.error('An error occurred', error);
    throw error;
  }
}
