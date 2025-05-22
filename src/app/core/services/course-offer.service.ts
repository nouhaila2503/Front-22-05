// src/app/services/course-offer.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { CourseOffer} from '../models/course-offer.model';
import { Module} from '../models/module.model';
import { Domaine } from '../models/domaine.model';

@Injectable({
  providedIn: 'root'
})
export class CourseOfferService {
  private readonly DELAY_MS = 400;

  constructor() {}

  getCourseOffers(tuteurId: string): Observable<CourseOffer[]> {
    const mockOffers: CourseOffer[] = [
      {
        id: 'offer-001',
        tuteurId,
        moduleId: 'module-001',
        module: {
          id: 'module-001',
          name: 'Algèbre Linéaire',
          description: 'Étude des espaces vectoriels et applications linéaires',
          domaineId: 'domaine-001',
          difficulty: 'Intermédiaire',
          duration: 120,
          prerequisites: ['Mathématiques niveau Terminale'],
          isActive: true,
          createdAt: new Date('2025-01-10')
        },
        domaineId: 'domaine-001',
        domaine: {
          id: 'domaine-001',
          name: 'Mathématiques',
          description: 'Sciences mathématiques',
          icon: 'pi pi-calculator',
          isActive: true,
          createdAt: new Date('2024-01-01')
        },
        niveau: 'Intermédiaire',
        title: 'Cours d\'Algèbre Linéaire - Niveau Licence',
        description: 'Maîtrisez les concepts fondamentaux de l\'algèbre linéaire : espaces vectoriels, applications linéaires, matrices et déterminants.',
        prixParHeure: 35,
        dateDisponibilite: new Date('2025-05-25'),
        creneaux: [
          {
            id: 'slot-001',
            startTime: '09:00',
            endTime: '11:00',
            isBooked: false,
            isRecurring: true,
            recurringPattern: {
              type: 'weekly',
              interval: 1,
              daysOfWeek: [1, 3],
              endDate: new Date('2025-07-30')
            },
            maxCapacity: 1,
            currentBookings: 0
          }
        ],
        maxStudents: 3,
        currentStudents: 1,
        requirements: ['Calculatrice scientifique', 'Cahier de notes'],
        materials: ['Manuel d\'algèbre linéaire (fourni)', 'Exercices corrigés'],
        isActive: true,
        tags: ['licence', 'mathématiques', 'algèbre', 'matrices'],
        location: {
          type: 'hybrid',
          platform: 'Zoom',
          meetingUrl: 'https://zoom.us/j/123456789',
          address: 'Bibliothèque universitaire, Paris 5e'
        },
        createdAt: new Date('2025-05-15'),
        updatedAt: new Date('2025-05-20')
      },
      {
        id: 'offer-002',
        tuteurId,
        moduleId: 'module-002',
        module: {
          id: 'module-002',
          name: 'Mécanique Quantique',
          description: 'Principes fondamentaux de la physique quantique',
          domaineId: 'domaine-002',
          difficulty: 'Avancé',
          duration: 180,
          prerequisites: ['Physique niveau L2', 'Mathématiques avancées'],
          isActive: true,
          createdAt: new Date('2025-02-01')
        },
        domaineId: 'domaine-002',
        domaine: {
          id: 'domaine-002',
          name: 'Physique',
          description: 'Sciences physiques',
          icon: 'pi pi-bolt',
          isActive: true,
          createdAt: new Date('2024-01-01')
        },
        niveau: 'Avancé',
        title: 'Introduction à la Mécanique Quantique',
        description: 'Découvrez les mystères de la physique quantique : superposition, intrication et applications modernes.',
        prixParHeure: 45,
        dateDisponibilite: new Date('2025-05-26'),
        creneaux: [
          {
            id: 'slot-003',
            startTime: '10:00',
            endTime: '13:00',
            isBooked: false,
            isRecurring: true,
            recurringPattern: {
              type: 'weekly',
              interval: 1,
              daysOfWeek: [2, 4],
              endDate: new Date('2025-08-15')
            },
            maxCapacity: 2,
            currentBookings: 0
          }
        ],
        maxStudents: 2,
        currentStudents: 0,
        requirements: ['Niveau M1 en Physique', 'Notions de mathématiques avancées'],
        materials: ['Livre de référence (fourni)', 'Simulateur quantique en ligne'],
        isActive: true,
        tags: ['master', 'physique', 'quantique', 'recherche'],
        location: {
          type: 'online',
          platform: 'Teams',
          meetingUrl: 'https://teams.microsoft.com/l/meetup-join/...'
        },
        createdAt: new Date('2025-05-18'),
        updatedAt: new Date('2025-05-21')
      }
    ];

    return of(mockOffers).pipe(delay(this.DELAY_MS));
  }

  createCourseOffer(offer: Omit<CourseOffer, 'id' | 'createdAt' | 'updatedAt'>): Observable<CourseOffer> {
    const newOffer: CourseOffer = {
      ...offer,
      id: `offer-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return of(newOffer).pipe(delay(this.DELAY_MS));
  }

  updateCourseOffer(id: string, offer: Partial<CourseOffer>): Observable<CourseOffer> {
    return this.getCourseOffers(offer.tuteurId || 'tuteur-001').pipe(
      map(offers => {
        const existing = offers.find(o => o.id === id);
        if (!existing) throw new Error('Offre de cours non trouvée');
        return { ...existing, ...offer, updatedAt: new Date() };
      }),
      delay(this.DELAY_MS)
    );
  }

  deleteCourseOffer(id: string): Observable<boolean> {
    return of(true).pipe(delay(this.DELAY_MS));
  }

  getDomaines(): Observable<Domaine[]> {
    const mockDomaines: Domaine[] = [
      {
        id: 'domaine-001',
        name: 'Mathématiques',
        description: 'Algèbre, Analyse, Géométrie, Statistiques',
        icon: 'pi pi-calculator',
        isActive: true,
        createdAt: new Date('2024-01-01')
      },
      {
        id: 'domaine-002',
        name: 'Physique',
        description: 'Mécanique, Thermodynamique, Électromagnétisme, Quantique',
        icon: 'pi pi-bolt',
        isActive: true,
        createdAt: new Date('2024-01-01')
      },
      {
        id: 'domaine-003',
        name: 'Chimie',
        description: 'Chimie organique, inorganique, analytique',
        icon: 'pi pi-flask',
        isActive: true,
        createdAt: new Date('2024-01-01')
      }
    ];
    return of(mockDomaines).pipe(delay(200));
  }

  getModulesByDomaine(domaineId: string): Observable<Module[]> {
    const mockModules: { [key: string]: Module[] } = {
      'domaine-001': [
        {
          id: 'module-001',
          name: 'Algèbre Linéaire',
          description: 'Espaces vectoriels et applications linéaires',
          domaineId: 'domaine-001',
          difficulty: 'Intermédiaire',
          duration: 120,
          isActive: true,
          createdAt: new Date('2025-01-10')
        }
      ],
      'domaine-002': [
        {
          id: 'module-003',
          name: 'Mécanique Quantique',
          description: 'Principes de la physique quantique',
          domaineId: 'domaine-002',
          difficulty: 'Avancé',
          duration: 180,
          isActive: true,
          createdAt: new Date('2025-02-01')
        }
      ]
    };
    return of(mockModules[domaineId] || []).pipe(delay(300));
  }
}