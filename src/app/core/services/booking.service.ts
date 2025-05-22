import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'api/bookings'; // This would be your real API endpoint

  // Simulated bookings data
  private bookings = [
    {
      id: 1,
      courseOffer: {
        id: 101,
        module: { id: 201, name: 'Mathematics' }
      },
      tuteur: {
        id: 301,
        username: 'MathExpert',
        photoUrl: 'assets/images/tutor1.jpg'
      },
      scheduledDate: new Date(2025, 4, 25, 10, 0),
      status: 'Pending'
    },
    {
      id: 2,
      courseOffer: {
        id: 102,
        module: { id: 202, name: 'Physics' }
      },
      tuteur: {
        id: 302,
        username: 'PhysicsProf',
        photoUrl: 'assets/images/tutor2.jpg'
      },
      scheduledDate: new Date(2025, 4, 23, 14, 30),
      status: 'Accepted'
    },
    {
      id: 3,
      courseOffer: {
        id: 103,
        module: { id: 203, name: 'English' }
      },
      tuteur: {
        id: 303,
        username: 'EnglishTeacher',
        photoUrl: 'assets/images/tutor3.jpg'
      },
      scheduledDate: new Date(2025, 4, 20, 16, 0),
      status: 'Completed'
    }
  ];

  constructor(private http: HttpClient) { }

  getRecentBookings(): Observable<any[]> {
    // Return with delay to simulate network latency
    return of(this.bookings).pipe(delay(1000));
    
    // Real implementation:
    // return this.http.get<any[]>(`${this.apiUrl}/recent`);
  }
  
  getBookingDetails(id: number): Observable<any> {
    const booking = this.bookings.find(b => b.id === id);
    return of(booking).pipe(delay(700));
    
    // Real implementation:
    // return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  cancelBooking(id: number): Observable<any> {
    // Update local data
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = 'Cancelled';
    }
    
    return of({ success: true }).pipe(delay(800));
    
    // Real implementation:
    // return this.http.post<any>(`${this.apiUrl}/${id}/cancel`, {});
  }
  
  rescheduleBooking(id: number, newDate: Date): Observable<any> {
    // Update local data
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.scheduledDate = newDate;
    }
    
    return of({ success: true }).pipe(delay(900));
    
    // Real implementation:
    // return this.http.post<any>(`${this.apiUrl}/${id}/reschedule`, { scheduledDate: newDate });
  }
}