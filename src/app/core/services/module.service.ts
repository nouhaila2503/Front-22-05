import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all modules
   */
  getModules(domaineId?: number): Observable<any[]> {
    // For development, use mock data if needed
    if (!environment.production && environment.useMocks) {
      return of(this.getMockModules(domaineId));
    }
    
    let params = new HttpParams();
    if (domaineId) {
      params = params.set('domaineId', domaineId.toString());
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/api/modules`, { params })
      .pipe(
        catchError(this.handleError<any[]>('getModules', []))
      );
  }

  /**
   * Get a module by ID
   */
  getModule(id: number): Observable<any> {
    // For development, use mock data if needed
    if (!environment.production && environment.useMocks) {
      const modules = this.getMockModules();
      const module = modules.find(m => m.id === id);
      return of(module || null);
    }
    
    return this.http.get<any>(`${this.apiUrl}/api/modules/${id}`)
      .pipe(
        catchError(this.handleError<any>(`getModule id=${id}`))
      );
  }

  /**
   * Get tutors for a specific module
   */
  getTutorsByModule(id: number): Observable<any[]> {
    // For development, use mock data if needed
    if (!environment.production && environment.useMocks) {
      return of(this.getMockTutorsByModule(id));
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/api/modules/${id}/tuteurs`)
      .pipe(
        catchError(this.handleError<any[]>(`getTutorsByModule id=${id}`, []))
      );
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

  // Mock data for development
  private getMockModules(domaineId?: number): any[] {
    const modules = [
      {
        id: 1,
        name: 'Calculus',
        description: 'Differential and integral calculus',
        domaineId: 1
      },
      {
        id: 2,
        name: 'Algebra',
        description: 'Linear algebra and matrix operations',
        domaineId: 1
      },
      {
        id: 3,
        name: 'Statistics',
        description: 'Statistical methods and probability',
        domaineId: 1
      },
      {
        id: 4,
        name: 'Mechanics',
        description: 'Classical mechanics and forces',
        domaineId: 2
      },
      {
        id: 5,
        name: 'Thermodynamics',
        description: 'Heat transfer and energy systems',
        domaineId: 2
      },
      {
        id: 6,
        name: 'Quantum Physics',
        description: 'Quantum mechanics and phenomena',
        domaineId: 2
      },
      {
        id: 7,
        name: 'Arabic Grammar',
        description: 'Arabic language structure and rules',
        domaineId: 3
      },
      {
        id: 8,
        name: 'French Grammar',
        description: 'French language structure and rules',
        domaineId: 3
      },
      {
        id: 9,
        name: 'Creative Writing',
        description: 'Fiction and poetry writing techniques',
        domaineId: 3
      },
      {
        id: 10,
        name: 'Programming',
        description: 'Software development and coding',
        domaineId: 4
      },
      {
        id: 11,
        name: 'Algorithms',
        description: 'Algorithm design and analysis',
        domaineId: 4
      },
      {
        id: 12,
        name: 'Web Development',
        description: 'Building web applications',
        domaineId: 4
      }
    ];
    
    // If domaineId is provided, filter the modules
    if (domaineId) {
      return modules.filter(module => module.domaineId === domaineId);
    }
    
    return modules;
  }
  
  private getMockTutorsByModule(moduleId: number): any[] {
    const tutors = [
      {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        photoUrl: 'assets/images/tutors/tutor1.jpg',
        specialization: 'Mathematics Expert',
        rating: 4.8,
        reviewsCount: 124,
        hourlyRate: 250,
        modules: [1, 2, 3]
      },
      {
        id: 2,
        firstName: 'Mohammed',
        lastName: 'El Alami',
        photoUrl: 'assets/images/tutors/tutor2.jpg',
        specialization: 'Physics Professor',
        rating: 4.9,
        reviewsCount: 89,
        hourlyRate: 300,
        modules: [4, 5, 6]
      },
      {
        id: 3,
        firstName: 'Fatima',
        lastName: 'Zahra',
        photoUrl: 'assets/images/tutors/tutor3.jpg',
        specialization: 'Literature Teacher',
        rating: 4.7,
        reviewsCount: 56,
        hourlyRate: 200,
        modules: [7, 8, 9]
      },
      {
        id: 4,
        firstName: 'Ahmed',
        lastName: 'Benali',
        photoUrl: 'assets/images/tutors/tutor4.jpg',
        specialization: 'Computer Science',
        rating: 4.6,
        reviewsCount: 78,
        hourlyRate: 275,
        modules: [10, 11, 12]
      },
      {
        id: 5,
        firstName: 'Claire',
        lastName: 'Dubois',
        photoUrl: 'assets/images/tutors/tutor5.jpg',
        specialization: 'Language Teacher',
        rating: 4.5,
        reviewsCount: 62,
        hourlyRate: 225,
        modules: [8, 9]
      },
      {
        id: 6,
        firstName: 'Karim',
        lastName: 'Mansouri',
        photoUrl: 'assets/images/tutors/tutor6.jpg',
        specialization: 'Chemistry Teacher',
        rating: 4.4,
        reviewsCount: 45,
        hourlyRate: 220,
        modules: [1, 5]
      }
    ];
    
    // Return tutors that teach the specified module
    return tutors.filter(tutor => tutor.modules.includes(moduleId));
  }
}