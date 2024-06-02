import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/**
 * Authentication service to handle login, signup, and token management operations.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL: string = 'http://localhost:3000';
  private readonly ACCESS_TOKEN_KEY: string = 'access_token'; // access token key name

  constructor(private http: HttpClient) { }

  /**
   * Log in a user.
   *
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns An Observable emitting an object containing the access token.
   */
  login(username: string, password: string): Observable<{ token: string }> {
    const url = `${this.API_URL}/login`;
    const body = { username, password };
    return this.http.post<{ token: string }>(url, body).pipe(
      tap(response => this.setAccessToken(response.token)),
      catchError(this.handleError)
    );
  }

  /**
   * Sign up a new user.
   *
   * @param username - The user's username.
   * @param password - The user's password.
   * @param displayName - The user's display name.
   * @param email - The user's email address.
   * @returns An Observable emitting the newly created user.
   */
  signup(username: string, password: string, displayName: string, email: string): Observable<User> {
    const url = `${this.API_URL}/signup`;
    const body = { username, password, displayName, email };
    return this.http.post<User>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Log out the current user.
   *
   * @returns An Observable emitting any response from the logout API.
   */
  logout(): Observable<any> {
    const url = `${this.API_URL}/logout`;
    return this.http.post<any>(url, {}).pipe(
      tap(() => this.removeAccessToken()),
      catchError(this.handleError)
    );
  }

  /**
   * Caution: This contains sensitive information.
   *
   * @returns Returns all keycloak user data.
   */
  /** @deprecated Do not use in production.*/
  getAllInfo(): any {
    return this.getUserInfo();
  }

  /**
   * Get the stored access token.
   *
   * @returns The access token or null if not found.
   */
  getAccessToken(): string | null {
    //return localStorage.getItem('access_token');
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    //return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Set the access token.
   *
   * @param token - The access token.
   */
  private setAccessToken(token: string): void {
    //localStorage.setItem('access_token', token);
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    //sessionStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  /**
   * Remove the stored access token.
   */
  private removeAccessToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    //sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  /**
  * Get user information from the token.
  *
  * Caution: This contains sensitive information.
  *
  * @returns The user information decoded from the token.
  */
  private getUserInfo(): any {
    const token = this.getAccessToken();
    let userInfo: any;

    if (token) {
      const payload = token.split('.')[1];
      const payloadDecodedJson = atob(payload);
      const payloadDecoded = JSON.parse(payloadDecodedJson);
      userInfo = payloadDecoded;
    }
    return userInfo;
  }

  /**
   * Handle errors in HTTP requests.
   *
   * @param error - The error that occurred.
   * @returns An Observable that throws the error.
   */
  private handleError(error: any): Observable<never> {
    // Manejo de errores personalizado
    console.error('An error occurred', error);
    throw error;
  }
}
