// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    const url = `${this.API_URL}/profile`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    // Manejo de errores personalizado
    console.error('An error occurred', error);
    throw error;
  }
}
