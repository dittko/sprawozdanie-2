import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://football-api-bdji.onrender.com/api/auth';
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      const decoded = token ? this.decodeToken(token) : null;
      this.currentUserSubject.next(decoded?.email || null);
    }
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          const decoded = this.decodeToken(response.token);
          this.currentUserSubject.next(decoded?.email || null);
        }
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getEmail(): string | null {
    const token = this.getToken();
    const decoded = token ? this.decodeToken(token) : null;
    return decoded?.email || null;
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }
}
