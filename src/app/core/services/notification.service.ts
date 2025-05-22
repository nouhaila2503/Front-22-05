import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'api/notifications'; // This would be your real API endpoint
  private unreadCount = 3; // For demo purposes

  constructor(private http: HttpClient) { }

  getUnreadCount(): Observable<number> {
    // Return with delay to simulate network latency
    return of(this.unreadCount).pipe(delay(400));
    
    // Real implementation:
    // return this.http.get<number>(`${this.apiUrl}/unread-count`);
  }
  
  markAllAsRead(): Observable<any> {
    // Simulated API response
    this.unreadCount = 0;
    return of({ success: true }).pipe(delay(300));
    
    // Real implementation:
    // return this.http.post<any>(`${this.apiUrl}/mark-read`, {});
  }
  
  getNotifications(): Observable<any[]> {
    // Simulated notifications
    const notifications = [
      {
        id: 1,
        type: 'booking',
        message: 'Your booking with MathExpert has been accepted',
        createdAt: new Date(),
        read: false
      },
      {
        id: 2,
        type: 'mentoring',
        message: 'PhysicsProf has accepted your mentoring request',
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        read: false
      },
      {
        id: 3,
        type: 'system',
        message: 'Welcome to TutorLink!',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        read: true
      }
    ];
    
    return of(notifications).pipe(delay(700));
    
    // Real implementation:
    // return this.http.get<any[]>(`${this.apiUrl}`);
  }
}