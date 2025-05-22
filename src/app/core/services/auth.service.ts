import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private tokenKey = 'tutorlink_token';
  private userKey = 'tutorlink_user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  /**
   * Register a new user
   */
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/register`, userData)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.setSession(response);
          }
        }),
        catchError(this.handleError<any>('register'))
      );
  }

  /**
   * Login user
   */
  login(credentials: { email: string, password: string }): Observable<any> {
    // For development with mock data
    if (!environment.production && environment.useMocks) {
      return this.mockLogin(credentials);
    }
    
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.setSession(response);
          }
        }),
        catchError(this.handleError<any>('login'))
      );
  }

  /**
   * Logout user
   */
  logout(): void {
    // For API call if needed
    // this.http.post(`${this.apiUrl}/api/auth/logout`, {}).subscribe();
    
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Get user profile
   */
  getProfile(): Observable<any> {
    // If we have the user in local storage, return it
    const user = this.getCurrentUser();
    if (user) {
      return of(user);
    }
    
    // Otherwise, fetch from API
    return this.http.get<any>(`${this.apiUrl}/api/auth/profile`)
      .pipe(
        tap(user => {
          if (user) {
            localStorage.setItem(this.userKey, JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        }),
        catchError(this.handleError<any>('getProfile'))
      );
  }

  /**
   * Update user profile
   */
  updateProfile(userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/auth/profile`, userData)
      .pipe(
        tap(updatedUser => {
          if (updatedUser) {
            localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
          }
        }),
        catchError(this.handleError<any>('updateProfile'))
      );
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Get the authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Get the current user
   */
  getCurrentUser(): any {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Get user role
   */
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  /**
   * Set session after successful auth
   */
  private setSession(authResult: any): void {
    localStorage.setItem(this.tokenKey, authResult.token);
    
    if (authResult.user) {
      localStorage.setItem(this.userKey, JSON.stringify(authResult.user));
      this.currentUserSubject.next(authResult.user);
    }
  }

  /**
   * Load user from local storage on service init
   */
  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem(this.userKey);
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Error parsing user from storage', e);
        localStorage.removeItem(this.userKey);
      }
    }
  }

  /**
   * Handle Http operation that failed
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  /**
   * Mock login for development
   */
  private mockLogin(credentials: { email: string, password: string }): Observable<any> {
    const mockUsers = [
      {
        email: 'student@example.com',
        password: 'password123',
        id: 1,
        firstName: 'Amine',
        lastName: 'Berrada',
        role: 'APPRENANT',
        photoUrl: 'assets/images/users/student.jpg'
      },
      {
        email: 'tutor@example.com',
        password: 'password123',
        id: 2,
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'TUTEUR',
        photoUrl: 'assets/images/tutors/tutor1.jpg'
      },
      {
        email: 'admin@example.com',
        password: 'password123',
        id: 3,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        photoUrl: 'assets/images/users/admin.jpg'
      }
    ];
    
    const user = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      // Create a copy without the password
      const { password, ...userWithoutPassword } = user;
      
      // Mock response with token
      const response = {
        user: userWithoutPassword,
        token: 'mock-jwt-token-' + user.role.toLowerCase()
      };
      
      return of(response);
    }
    
    // Mock error for invalid credentials
    return of({ error: 'Invalid credentials' });
  }
}