// services/subject.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Subject {
  id: number;
  name: string;
  category: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
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

  getSubjects(): Observable<Subject[]> {
    return of(this.subjects).pipe(delay(600));
  }
}