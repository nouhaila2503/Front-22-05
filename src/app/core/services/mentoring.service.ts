// services/mentoring-request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Define interfaces for your data structures
interface Tuteur {
  id: number;
  username: string;
  photoUrl: string;
  email?: string;
  hourlyRate?: number;
  rating?: number;
  specializations?: string[];
}

interface Module {
  id: number;
  name: string;
  category?: string;
  description?: string;
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

// New interfaces for the enhanced mentoring request form
export interface EnhancedMentoringRequest {
  id?: number;
  studentName: string;
  studentEmail: string;
  tutorId: number;
  subjectId: number;
  level: string;
  priceRange: string;
  note: string;
  status?: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt?: Date;
}

export interface Tutor {
  id: number;
  name: string;
  email: string;
  specializations: string[];
  avatar: string;
  rating: number;
  hourlyRate: number;
}

export interface Subject {
  id: number;
  name: string;
  category: string;
  description: string;
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

  // Enhanced mentoring requests data
  private enhancedRequests: EnhancedMentoringRequest[] = [];

  // Simulated tutors data
  private tutors: Tutor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@email.com',
      specializations: ['Mathematics', 'Physics'],
      avatar: 'assets/images/tutor1.jpg',
      rating: 4.9,
      hourlyRate: 45
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      email: 'michael.chen@email.com',
      specializations: ['Computer Science', 'Programming'],
      avatar: 'assets/images/tutor2.jpg',
      rating: 4.8,
      hourlyRate: 50
    },
    {
      id: 3,
      name: 'Ms. Emily Davis',
      email: 'emily.davis@email.com',
      specializations: ['Chemistry', 'Biology'],
      avatar: 'assets/images/tutor3.jpg',
      rating: 4.7,
      hourlyRate: 40
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      email: 'james.wilson@email.com',
      specializations: ['English Literature', 'Writing'],
      avatar: 'assets/images/tutor4.jpg',
      rating: 4.6,
      hourlyRate: 35
    }
  ];

  // Simulated subjects data
  private subjects: Subject[] = [
    { id: 1, name: 'Calculus', category: 'Mathematics', description: 'Advanced calculus and derivatives' },
    { id: 2, name: 'Algebra', category: 'Mathematics', description: 'Linear and abstract algebra' },
    { id: 3, name: 'Physics Mechanics', category: 'Physics', description: 'Classical mechanics and dynamics' },
    { id: 4, name: 'Quantum Physics', category: 'Physics', description: 'Quantum mechanics fundamentals' },
    { id: 5, name: 'Organic Chemistry', category: 'Chemistry', description: 'Organic compounds and reactions' },
    { id: 6, name: 'Web Development', category: 'Computer Science', description: 'Frontend and backend development' },
    { id: 7, name: 'Data Structures', category: 'Computer Science', description: 'Algorithms and data structures' },
    { id: 8, name: 'English Literature', category: 'English', description: 'Classic and modern literature' },
    { id: 9, name: 'Creative Writing', category: 'English', description: 'Fiction and non-fiction writing' },
    { id: 10, name: 'Biology', category: 'Science', description: 'General biology and life sciences' }
  ];

  constructor(private http: HttpClient) { }

  // Original methods
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

  // ===== NEW ENHANCED METHODS =====

  // Get all tutors
  getTutors(): Observable<Tutor[]> {
    return of(this.tutors).pipe(delay(800));
    
    // Real implementation:
    // return this.http.get<Tutor[]>(`${this.apiUrl}/tutors`);
  }

  // Get tutor by ID
  getTutorById(id: number): Observable<Tutor | undefined> {
    const tutor = this.tutors.find(t => t.id === id);
    return of(tutor).pipe(delay(500));
    
    // Real implementation:
    // return this.http.get<Tutor>(`${this.apiUrl}/tutors/${id}`);
  }

  // Get all subjects
  getSubjects(): Observable<Subject[]> {
    return of(this.subjects).pipe(delay(600));
    
    // Real implementation:
    // return this.http.get<Subject[]>(`${this.apiUrl}/subjects`);
  }

  // Get subject by ID
  getSubjectById(id: number): Observable<Subject | undefined> {
    const subject = this.subjects.find(s => s.id === id);
    return of(subject).pipe(delay(400));
    
    // Real implementation:
    // return this.http.get<Subject>(`${this.apiUrl}/subjects/${id}`);
  }

  // Send enhanced mentoring request
  sendEnhancedMentoringRequest(request: EnhancedMentoringRequest): Observable<{ success: boolean; message: string; requestId: number }> {
    // Create new enhanced request
    const newRequest: EnhancedMentoringRequest = {
      ...request,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date()
    };
    
    // Add to local array
    this.enhancedRequests.unshift(newRequest);
    
    // Get tutor and subject details for email simulation
    const tutor = this.tutors.find(t => t.id === newRequest.tutorId);
    const subject = this.subjects.find(s => s.id === newRequest.subjectId);
    
    console.log('=== SIMULATED EMAIL SENT ===');
    console.log(`To: ${tutor?.email}`);
    console.log(`Subject: New Mentoring Request from ${newRequest.studentName}`);
    console.log(`Body: 
      Dear ${tutor?.name},
      
      You have received a new mentoring request:
      
      Student: ${newRequest.studentName}
      Email: ${newRequest.studentEmail}
      Subject: ${subject?.name} (${subject?.category})
      Level: ${newRequest.level}
      Price Range: ${newRequest.priceRange}
      
      Message:
      ${newRequest.note}
      
      Please log in to your tutor dashboard to respond to this request.
      
      Best regards,
      TutorLink Team
    `);
    console.log('=== END EMAIL SIMULATION ===');
    
    return of({
      success: true,
      message: `Mentoring request sent successfully! ${tutor?.name} will receive an email notification and can respond through their tutor dashboard.`,
      requestId: newRequest.id!
    }).pipe(delay(1500));
    
    // Real implementation:
    // return this.http.post<{ success: boolean; message: string; requestId: number }>(`${this.apiUrl}/enhanced-requests`, request);
  }

  // Get student's enhanced mentoring requests
  getStudentEnhancedRequests(studentEmail: string): Observable<EnhancedMentoringRequest[]> {
    const studentRequests = this.enhancedRequests.filter(r => r.studentEmail === studentEmail);
    return of(studentRequests).pipe(delay(800));
    
    // Real implementation:
    // return this.http.get<EnhancedMentoringRequest[]>(`${this.apiUrl}/enhanced-requests/student/${studentEmail}`);
  }

  // Get all enhanced mentoring requests (for admin/debugging)
  getAllEnhancedRequests(): Observable<EnhancedMentoringRequest[]> {
    return of(this.enhancedRequests).pipe(delay(700));
    
    // Real implementation:
    // return this.http.get<EnhancedMentoringRequest[]>(`${this.apiUrl}/enhanced-requests`);
  }

  // Update enhanced mentoring request status
  updateEnhancedRequestStatus(requestId: number, status: 'accepted' | 'rejected' | 'cancelled'): Observable<{ success: boolean }> {
    const request = this.enhancedRequests.find(r => r.id === requestId);
    if (request) {
      request.status = status;
    }
    
    return of({ success: true }).pipe(delay(600));
    
    // Real implementation:
    // return this.http.patch<{ success: boolean }>(`${this.apiUrl}/enhanced-requests/${requestId}/status`, { status });
  }

  // Get tutors by subject specialization
  getTutorsBySubject(subjectId: number): Observable<Tutor[]> {
    const subject = this.subjects.find(s => s.id === subjectId);
    if (!subject) {
      return of([]);
    }
    
    const matchingTutors = this.tutors.filter(tutor => 
      tutor.specializations.some(spec => 
        spec.toLowerCase().includes(subject.category.toLowerCase()) ||
        spec.toLowerCase().includes(subject.name.toLowerCase())
      )
    );
    
    return of(matchingTutors).pipe(delay(500));
    
    // Real implementation:
    // return this.http.get<Tutor[]>(`${this.apiUrl}/tutors/by-subject/${subjectId}`);
  }
}