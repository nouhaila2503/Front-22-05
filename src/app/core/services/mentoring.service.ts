import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Define interfaces for your data structures
interface Tuteur {
  id: number;
  username: string;
  photoUrl: string;
}

interface Module {
  id: number;
  name: string;
}

interface MentoringRequest {
  id: number;
  tuteur: Tuteur;
  module: Module;
  message?: string;
  status: 'Pending' | 'Accepted' | 'Cancelled';
  createdAt: Date;
}

interface MentoringFormData {
  tuteurId: number;
  moduleId: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MentoringService {
  private apiUrl = 'api/mentoring'; // This would be your real API endpoint

  // Simulated mentoring requests data
  private mentoringRequests: MentoringRequest[] = [
    {
      id: 1,
      tuteur: {
        id: 301,
        username: 'MathExpert',
        photoUrl: 'assets/images/tutor1.jpg'
      },
      module: { id: 201, name: 'Mathematics' },
      status: 'Pending',
      createdAt: new Date(2025, 4, 19, 9, 0)
    },
    {
      id: 2,
      tuteur: {
        id: 304,
        username: 'ChemistryPro',
        photoUrl: 'assets/images/tutor4.jpg'
      },
      module: { id: 204, name: 'Chemistry' },
      status: 'Accepted',
      createdAt: new Date(2025, 4, 15, 11, 30)
    }
  ];

  constructor(private http: HttpClient) { }

  getRecentMentoringRequests(): Observable<MentoringRequest[]> {
    // Return with delay to simulate network latency
    return of(this.mentoringRequests).pipe(delay(900));
    
    // Real implementation:
    // return this.http.get<MentoringRequest[]>(`${this.apiUrl}/recent`);
  }
  
  getMentoringRequestDetails(id: number): Observable<MentoringRequest | undefined> {
    const request = this.mentoringRequests.find(r => r.id === id);
    return of(request).pipe(delay(600));
    
    // Real implementation:
    // return this.http.get<MentoringRequest>(`${this.apiUrl}/${id}`);
  }
  
  cancelMentoringRequest(id: number): Observable<{success: boolean}> {
    // Update local data
    const request = this.mentoringRequests.find(r => r.id === id);
    if (request) {
      request.status = 'Cancelled';
    }
    
    return of({ success: true }).pipe(delay(750));
    
    // Real implementation:
    // return this.http.post<{success: boolean}>(`${this.apiUrl}/${id}/cancel`, {});
  }
  
  createMentoringRequest(formData: MentoringFormData): Observable<MentoringRequest> {
    // Create a new request from form data
    const newId = this.mentoringRequests.length + 1;
    
    // Type your maps properly with Record
    const tutorMap: Record<number, Tuteur> = {
      301: { id: 301, username: 'MathExpert', photoUrl: 'assets/images/tutor1.jpg' },
      302: { id: 302, username: 'PhysicsProf', photoUrl: 'assets/images/tutor2.jpg' },
      303: { id: 303, username: 'EnglishTeacher', photoUrl: 'assets/images/tutor3.jpg' },
      304: { id: 304, username: 'ChemistryPro', photoUrl: 'assets/images/tutor4.jpg' }
    };
    
    const moduleMap: Record<number, Module> = {
      201: { id: 201, name: 'Mathematics' },
      202: { id: 202, name: 'Physics' },
      203: { id: 203, name: 'English' },
      204: { id: 204, name: 'Chemistry' }
    };
    
    // Create new request with proper typing
    const newRequest: MentoringRequest = {
      id: newId,
      tuteur: tutorMap[formData.tuteurId],
      module: moduleMap[formData.moduleId],
      message: formData.message,
      status: 'Pending',
      createdAt: new Date()
    };
    
    // Add to local array
    this.mentoringRequests.unshift(newRequest);
    
    return of(newRequest).pipe(delay(1200));
    
    // Real implementation:
    // return this.http.post<MentoringRequest>(`${this.apiUrl}`, formData);
  }
}