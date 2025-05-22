import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/users'; // This would be your real API endpoint

  constructor(private http: HttpClient) { }

  // For demo, we'll use fake API calls with simulated delays

  getCurrentUser(): Observable<any> {
    // Simulated API response
    const user = {
      id: 1,
      username: 'SarahLearner',
      email: 'sarah@example.com',
      photoUrl: 'assets/images/user-profile.jpg',
      lastLoginAt: new Date(),
      role: 'apprenant'
    };
    
    // Return with delay to simulate network latency
    return of(user).pipe(delay(800));
    
    // Real implementation would be:
    // return this.http.get<any>(`${this.apiUrl}/current`);
  }
  
  getPendingCounts(): Observable<any> {
    // Simulated counts
    const counts = {
      bookings: 2,
      mentoring: 1,
      notifications: 3
    };
    
    return of(counts).pipe(delay(600));
    
    // Real implementation:
    // return this.http.get<any>(`${this.apiUrl}/pending-counts`);
  }
  
  logout(): Observable<any> {
    // Simulated logout response
    return of({ success: true }).pipe(delay(300));
    
    // Real implementation:
    // return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }
}