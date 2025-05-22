// services/tutor.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Tutor {
  id: number;
  name: string;
  email: string;
  specializations: string[];
  avatar: string;
  rating: number;
  hourlyRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class TutorService {
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

  getTutors(): Observable<Tutor[]> {
    return of(this.tutors).pipe(delay(800));
  }

  getTutorById(id: number): Observable<Tutor | undefined> {
    const tutor = this.tutors.find(t => t.id === id);
    return of(tutor).pipe(delay(500));
  }
}