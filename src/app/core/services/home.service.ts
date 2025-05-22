import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get featured tutors (rating > 4)
   */
  getFeaturedTutors(): Observable<any[]> {
    // For development, use mock data if needed
    if (!environment.production && environment.useMocks) {
      return of(this.getMockFeaturedTutors());
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/api/tuteurs/featured`)
      .pipe(
        catchError(this.handleError<any[]>('getFeaturedTutors', []))
      );
  }

  /**
   * Get featured course offers
   */
  getFeaturedCourses(): Observable<any[]> {
    // For development, use mock data if needed
    if (!environment.production && environment.useMocks) {
      return of(this.getMockFeaturedCourses());
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/api/course-offers/featured`)
      .pipe(
        catchError(this.handleError<any[]>('getFeaturedCourses', []))
      );
  }

  /**
   * Get popular domains/subjects
   */
  getPopularDomains(): Observable<any[]> {
    // For development, use mock data if needed
    if (!environment.production && environment.useMocks) {
      return of(this.getMockPopularDomains());
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/api/domaines`)
      .pipe(
        catchError(this.handleError<any[]>('getPopularDomains', []))
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
  private getMockFeaturedTutors(): any[] {
    return [
      {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        photoUrl: 'assets/images/tutors/tutor1.jpg',
        specialization: 'Mathematics Expert',
        rating: 4.8,
        reviewsCount: 124,
        modules: [
          { id: 1, name: 'Calculus' },
          { id: 2, name: 'Algebra' },
          { id: 3, name: 'Statistics' }
        ],
        hourlyRate: 250
      },
      {
        id: 2,
        firstName: 'Mohammed',
        lastName: 'El Alami',
        photoUrl: 'assets/images/tutors/tutor2.jpg',
        specialization: 'Physics Professor',
        rating: 4.9,
        reviewsCount: 89,
        modules: [
          { id: 4, name: 'Mechanics' },
          { id: 5, name: 'Thermodynamics' },
          { id: 6, name: 'Quantum Physics' }
        ],
        hourlyRate: 300
      },
      {
        id: 3,
        firstName: 'Fatima',
        lastName: 'Zahra',
        photoUrl: 'assets/images/tutors/tutor3.jpg',
        specialization: 'Literature Teacher',
        rating: 4.7,
        reviewsCount: 56,
        modules: [
          { id: 7, name: 'Arabic Literature' },
          { id: 8, name: 'French Literature' },
          { id: 9, name: 'Creative Writing' }
        ],
        hourlyRate: 200
      },
      {
        id: 4,
        firstName: 'Ahmed',
        lastName: 'Benali',
        photoUrl: 'assets/images/tutors/tutor4.jpg',
        specialization: 'Computer Science',
        rating: 4.6,
        reviewsCount: 78,
        modules: [
          { id: 10, name: 'Programming' },
          { id: 11, name: 'Algorithms' },
          { id: 12, name: 'Web Development' }
        ],
        hourlyRate: 275
      }
    ];
  }

  private getMockFeaturedCourses(): any[] {
    return [
      {
        id: 1,
        title: 'Advanced Calculus for Engineering',
        description: 'Master the calculus concepts needed for engineering careers. Covers limits, derivatives, integrals, and applications.',
        imageUrl: 'assets/images/courses/calculus.jpg',
        isFeatured: true,
        tutor: {
          id: 1,
          firstName: 'Sarah',
          lastName: 'Johnson',
          photoUrl: 'assets/images/tutors/tutor1.jpg'
        },
        durationHours: 20,
        enrollmentCount: 42,
        price: 1500
      },
      {
        id: 2,
        title: 'French Language for Beginners',
        description: 'Learn French from scratch with a native speaker. This course focuses on conversation skills and basic grammar.',
        imageUrl: 'assets/images/courses/french.jpg',
        isFeatured: true,
        tutor: {
          id: 5,
          firstName: 'Claire',
          lastName: 'Dubois',
          photoUrl: 'assets/images/tutors/tutor5.jpg'
        },
        durationHours: 15,
        enrollmentCount: 37,
        price: 1200
      },
      {
        id: 3,
        title: 'Introduction to Web Development',
        description: 'Build responsive websites using HTML, CSS, and JavaScript. Projects include portfolio site and e-commerce page.',
        imageUrl: 'assets/images/courses/webdev.jpg',
        isFeatured: true,
        tutor: {
          id: 4,
          firstName: 'Ahmed',
          lastName: 'Benali',
          photoUrl: 'assets/images/tutors/tutor4.jpg'
        },
        durationHours: 24,
        enrollmentCount: 63,
        price: 1800
      },
      {
        id: 4,
        title: 'Chemistry Fundamentals',
        description: 'Understand core chemistry concepts from atoms to reactions. Perfect for high school and early university students.',
        imageUrl: 'assets/images/courses/chemistry.jpg',
        isFeatured: true,
        tutor: {
          id: 6,
          firstName: 'Karim',
          lastName: 'Mansouri',
          photoUrl: 'assets/images/tutors/tutor6.jpg'
        },
        durationHours: 18,
        enrollmentCount: 29,
        price: 1350
      }
    ];
  }

  private getMockPopularDomains(): any[] {
    return [
      {
        id: 1,
        name: 'Mathematics',
        icon: 'pi pi-calculator',
        tutorCount: 48,
        moduleCount: 12
      },
      {
        id: 2,
        name: 'Physics',
        icon: 'pi pi-compass',
        tutorCount: 35,
        moduleCount: 9
      },
      {
        id: 3,
        name: 'Languages',
        icon: 'pi pi-comments',
        tutorCount: 52,
        moduleCount: 15
      },
      {
        id: 4,
        name: 'Computer Science',
        icon: 'pi pi-desktop',
        tutorCount: 41,
        moduleCount: 14
      },
      {
        id: 5,
        name: 'Biology',
        icon: 'pi pi-heart-fill',
        tutorCount: 28,
        moduleCount: 8
      },
      {
        id: 6,
        name: 'Chemistry',
        icon: 'pi pi-filter',
        tutorCount: 26,
        moduleCount: 7
      }
    ];
  }
}