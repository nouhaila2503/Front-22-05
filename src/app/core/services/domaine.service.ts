import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all domaines (subject areas)
   */
  getDomaines(): Observable<any[]> {
    // For development, use mock data if needed
    if (!environment.production && environment.useMocks) {
      return of(this.getMockDomaines());
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/api/domaines`)
      .pipe(
        catchError(this.handleError<any[]>('getDomaines', []))
      );
  }

  /**
   * Get a domaine by ID
   */
  getDomaine(id: number): Observable<any> {
    // For development, use mock data if needed
    if (!environment.production && environment.useMocks) {
      const domaines = this.getMockDomaines();
      const domaine = domaines.find(d => d.id === id);
      return of(domaine || null);
    }
    
    return this.http.get<any>(`${this.apiUrl}/api/domaines/${id}`)
      .pipe(
        catchError(this.handleError<any>(`getDomaine id=${id}`))
      );
  }

  /**
   * Get modules by domaine ID
   */
  getModulesByDomaine(id: number): Observable<any[]> {
    // For development, use mock data if needed
    if (!environment.production && environment.useMocks) {
      return of(this.getMockModulesByDomaine(id));
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/api/domaines/${id}/modules`)
      .pipe(
        catchError(this.handleError<any[]>(`getModulesByDomaine id=${id}`, []))
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
  private getMockDomaines(): any[] {
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
  
  private getMockModulesByDomaine(domaineId: number): any[] {
    const modulesByDomaine = {
      1: [ // Mathematics
        {
          id: 1,
          name: 'Calculus',
          description: 'Differential and integral calculus',
          tutorCount: 18
        },
        {
          id: 2,
          name: 'Algebra',
          description: 'Linear algebra and matrix operations',
          tutorCount: 15
        },
        {
          id: 3,
          name: 'Statistics',
          description: 'Statistical methods and probability',
          tutorCount: 12
        }
      ],
      2: [ // Physics
        {
          id: 4,
          name: 'Mechanics',
          description: 'Classical mechanics and forces',
          tutorCount: 14
        },
        {
          id: 5,
          name: 'Thermodynamics',
          description: 'Heat transfer and energy systems',
          tutorCount: 11
        },
        {
          id: 6,
          name: 'Quantum Physics',
          description: 'Quantum mechanics and phenomena',
          tutorCount: 8
        }
      ],
      3: [ // Languages
        {
          id: 7,
          name: 'Arabic Grammar',
          description: 'Arabic language structure and rules',
          tutorCount: 16
        },
        {
          id: 8,
          name: 'French Grammar',
          description: 'French language structure and rules',
          tutorCount: 19
        },
        {
          id: 9,
          name: 'Creative Writing',
          description: 'Fiction and poetry writing techniques',
          tutorCount: 14
        }
      ],
      4: [ // Computer Science
        {
          id: 10,
          name: 'Programming',
          description: 'Software development and coding',
          tutorCount: 17
        },
        {
          id: 11,
          name: 'Algorithms',
          description: 'Algorithm design and analysis',
          tutorCount: 13
        },
        {
          id: 12,
          name: 'Web Development',
          description: 'Building web applications',
          tutorCount: 15
        }
      ],
      5: [ // Biology
        {
          id: 13,
          name: 'Anatomy',
          description: 'Study of body structure',
          tutorCount: 9
        },
        {
          id: 14,
          name: 'Genetics',
          description: 'Study of genes and heredity',
          tutorCount: 11
        },
        {
          id: 15,
          name: 'Microbiology',
          description: 'Study of microorganisms',
          tutorCount: 8
        }
      ],
      6: [ // Chemistry
        {
          id: 16,
          name: 'Organic Chemistry',
          description: 'Study of carbon-based compounds',
          tutorCount: 10
        },
        {
          id: 17,
          name: 'Inorganic Chemistry',
          description: 'Study of non-carbon compounds',
          tutorCount: 9
        },
        {
          id: 18,
          name: 'Biochemistry',
          description: 'Study of chemical processes in living organisms',
          tutorCount: 7
        }
      ]
    };
    
    // Return modules for the specified domain, or empty array if not found
    return modulesByDomaine[domaineId as keyof typeof modulesByDomaine] || [];
  }
}