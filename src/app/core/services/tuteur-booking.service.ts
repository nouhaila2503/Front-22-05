// src/app/services/tuteur-booking.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, delay, map, throwError } from 'rxjs';
import { BookingRequest, BookingStatus } from '../models/booking.model';
import { User } from '../models/user.model';
import { CourseOffer } from '../models/course-offer.model';

@Injectable({
  providedIn: 'root'
})
export class TuteurBookingService {
  private readonly DELAY_MS = 500;

  constructor() {}

  getBookingRequests(tuteurId: string): Observable<BookingRequest[]> {
    const mockRequests: BookingRequest[] = [
      {
        id: 'booking-001',
        apprenantId: 'apprenant-001',
        apprenant: {
          id: 'apprenant-001',
          username: 'jean_martin',
          email: 'jean.martin@email.com',
          firstName: 'Jean',
          lastName: 'Martin',
          profilePicture: '/api/placeholder/80/80',
          phone: '+33 6 98 76 54 32',
          createdAt: new Date('2024-09-15'),
          updatedAt: new Date('2025-05-20')
        },
        courseOfferId: 'offer-001',
        courseOffer: {
          id: 'offer-001',
          tuteurId: 'tuteur-001',
          moduleId: 'module-001',
          domaineId: 'domaine-001',
          niveau: 'Intermédiaire',
          title: 'Cours d\'Algèbre Linéaire - Niveau Licence',
          description: 'Maîtrisez les concepts fondamentaux de l\'algèbre linéaire',
          prixParHeure: 35,
          dateDisponibilite: new Date('2025-05-25'),
          creneaux: [],
          maxStudents: 3,
          currentStudents: 1,
          isActive: true,
          tags: ['algèbre', 'mathématiques'],
          location: {
            type: 'hybrid',
            platform: 'Zoom'
          },
          createdAt: new Date('2025-05-15'),
          updatedAt: new Date('2025-05-20'),
          module: {
            id: 'module-001',
            name: 'Algèbre Linéaire',
            description: 'Espaces vectoriels et applications linéaires',
            domaineId: 'domaine-001',
            difficulty: 'Intermédiaire',
            duration: 120,
            isActive: true,
            createdAt: new Date('2025-01-10')
          }
        } as CourseOffer,
        tuteurId,
        scheduledDate: new Date('2025-05-25T09:00:00'),
        timeSlot: {
          id: 'slot-001',
          startTime: '09:00',
          endTime: '11:00',
          isBooked: false,
          isRecurring: false,
          maxCapacity: 1,
          currentBookings: 0
        },
        status: 'pending',
        message: 'Bonjour ! Je souhaiterais réserver ce cours pour approfondir mes connaissances en algèbre linéaire. J\'ai quelques difficultés avec les espaces vectoriels.',
        specialRequests: 'Pourriez-vous prévoir des exercices supplémentaires sur les applications linéaires ?',
        estimatedDuration: 120,
        totalPrice: 70,
        paymentStatus: 'pending',
        createdAt: new Date('2025-05-22T08:30:00'),
        updatedAt: new Date('2025-05-22T08:30:00')
      },
      {
        id: 'booking-002',
        apprenantId: 'apprenant-002',
        apprenant: {
          id: 'apprenant-002',
          username: 'sophie_durand',
          email: 'sophie.durand@email.com',
          firstName: 'Sophie',
          lastName: 'Durand',
          profilePicture: '/api/placeholder/80/80',
          createdAt: new Date('2024-11-10'),
          updatedAt: new Date('2025-05-21')
        },
        courseOfferId: 'offer-002',
        courseOffer: {
          id: 'offer-002',
          tuteurId: 'tuteur-001',
          moduleId: 'module-002',
          domaineId: 'domaine-002',
          niveau: 'Avancé',
          title: 'Introduction à la Mécanique Quantique',
          description: 'Découvrez les mystères de la physique quantique',
          prixParHeure: 45,
          dateDisponibilite: new Date('2025-05-26'),
          creneaux: [],
          maxStudents: 2,
          currentStudents: 0,
          isActive: true,
          tags: ['physique', 'quantique'],
          location: {
            type: 'online',
            platform: 'Teams'
          },
          createdAt: new Date('2025-05-18'),
          updatedAt: new Date('2025-05-21'),
          module: {
            id: 'module-002',
            name: 'Mécanique Quantique',
            description: 'Principes de la physique quantique',
            domaineId: 'domaine-002',
            difficulty: 'Avancé',
            duration: 180,
            isActive: true,
            createdAt: new Date('2025-02-01')
          }
        } as CourseOffer,
        tuteurId,
        scheduledDate: new Date('2025-05-26T10:00:00'),
        timeSlot: {
          id: 'slot-003',
          startTime: '10:00',
          endTime: '13:00',
          isBooked: false,
          isRecurring: false,
          maxCapacity: 2,
          currentBookings: 0
        },
        status: 'pending',
        message: 'Je prépare mon mémoire de M2 sur les applications quantiques. Ce cours m\'aiderait énormément !',
        estimatedDuration: 180,
        totalPrice: 135,
        paymentStatus: 'pending',
        createdAt: new Date('2025-05-23T14:15:00'),
        updatedAt: new Date('2025-05-23T14:15:00')
      },
      {
        id: 'booking-003',
        apprenantId: 'apprenant-003',
        apprenant: {
          id: 'apprenant-003',
          username: 'lucas_bernard',
          email: 'lucas.bernard@email.com',
          firstName: 'Lucas',
          lastName: 'Bernard',
          profilePicture: '/api/placeholder/80/80',
          createdAt: new Date('2025-01-20'),
          updatedAt: new Date('2025-05-22')
        },
        courseOfferId: 'offer-001',
        courseOffer: {
          id: 'offer-001',
          tuteurId: 'tuteur-001',
          moduleId: 'module-001',
          domaineId: 'domaine-001',
          niveau: 'Intermédiaire',
          title: 'Cours d\'Algèbre Linéaire - Niveau Licence',
          description: 'Maîtrisez les concepts fondamentaux de l\'algèbre linéaire',
          prixParHeure: 35,
          dateDisponibilite: new Date('2025-05-25'),
          creneaux: [],
          maxStudents: 3,
          currentStudents: 1,
          isActive: true,
          tags: ['algèbre', 'mathématiques'],
          location: {
            type: 'hybrid',
            platform: 'Zoom'
          },
          createdAt: new Date('2025-05-15'),
          updatedAt: new Date('2025-05-20'),
          module: {
            id: 'module-001',
            name: 'Algèbre Linéaire',
            description: 'Espaces vectoriels et applications linéaires',
            domaineId: 'domaine-001',
            difficulty: 'Intermédiaire',
            duration: 120,
            isActive: true,
            createdAt: new Date('2025-01-10')
          }
        } as CourseOffer,
        tuteurId,
        scheduledDate: new Date('2025-05-24T14:00:00'),
        timeSlot: {
          id: 'slot-002',
          startTime: '14:00',
          endTime: '16:00',
          isBooked: false,
          isRecurring: false,
          maxCapacity: 1,
          currentBookings: 0
        },
        status: 'accepted',
        message: 'Session de révision avant mon examen de licence.',
        estimatedDuration: 120,
        totalPrice: 70,
        paymentStatus: 'paid',
        createdAt: new Date('2025-05-20T16:45:00'),
        updatedAt: new Date('2025-05-21T09:20:00')
      }
    ];

    return of(mockRequests).pipe(delay(this.DELAY_MS));
  }

  getPendingBookings(tuteurId: string): Observable<BookingRequest[]> {
    return this.getBookingRequests(tuteurId).pipe(
      map(requests => requests.filter(r => r.status === 'pending'))
    );
  }

  getUpcomingBookings(tuteurId: string): Observable<BookingRequest[]> {
    return this.getBookingRequests(tuteurId).pipe(
      map(requests => requests.filter(r => 
        r.status === 'accepted' && new Date(r.scheduledDate) > new Date()
      ))
    );
  }

  updateBookingStatus(bookingId: string, status: BookingStatus, reason?: string): Observable<BookingRequest> {
    return this.getBookingRequests('tuteur-001').pipe(
      map(requests => {
        const booking = requests.find(r => r.id === bookingId);
        if (!booking) throw new Error('Réservation non trouvée');
        
        return {
          ...booking,
          status,
          cancellationReason: reason,
          updatedAt: new Date()
        };
      }),
      delay(this.DELAY_MS)
    );
  }

  acceptBooking(bookingId: string): Observable<BookingRequest> {
    return this.updateBookingStatus(bookingId, 'accepted');
  }

  rejectBooking(bookingId: string, reason?: string): Observable<BookingRequest> {
    return this.updateBookingStatus(bookingId, 'rejected', reason);
  }

  cancelBooking(bookingId: string, reason: string): Observable<BookingRequest> {
    return this.updateBookingStatus(bookingId, 'cancelled', reason);
  }

  completeBooking(bookingId: string): Observable<BookingRequest> {
    return this.updateBookingStatus(bookingId, 'completed');
  }

  getBookingsByDateRange(tuteurId: string, startDate: Date, endDate: Date): Observable<BookingRequest[]> {
    return this.getBookingRequests(tuteurId).pipe(
      map(requests => requests.filter(r => {
        const bookingDate = new Date(r.scheduledDate);
        return bookingDate >= startDate && bookingDate <= endDate;
      }))
    );
  }

  getBookingStats(tuteurId: string): Observable<any> {
    return this.getBookingRequests(tuteurId).pipe(
      map(requests => {
        const total = requests.length;
        const pending = requests.filter(r => r.status === 'pending').length;
        const accepted = requests.filter(r => r.status === 'accepted').length;
        const completed = requests.filter(r => r.status === 'completed').length;
        const cancelled = requests.filter(r => r.status === 'cancelled').length;
        
        const totalEarnings = requests
          .filter(r => r.status === 'completed')
          .reduce((sum, r) => sum + r.totalPrice, 0);
        
        return {
          total,
          pending,
          accepted,
          completed,
          cancelled,
          totalEarnings,
          completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
          averageSessionDuration: total > 0 ? 
            Math.round(requests.reduce((sum, r) => sum + r.estimatedDuration, 0) / total) : 0
        };
      }),
      delay(this.DELAY_MS)
    );
  }

  sendMessageToStudent(bookingId: string, message: string): Observable<boolean> {
    // Simulate sending message
    return of(true).pipe(delay(300));
  }

  // TUTEUR PROFILE METHODS
  getCurrentTuteur(): Observable<any> {
    const mockTuteur = {
      id: 'tuteur-001',
      username: 'marie_dupont',
      email: 'marie.dupont@email.com',
      firstName: 'Marie',
      lastName: 'Dupont',
      profilePicture: '/api/placeholder/150/150',
      phone: '+33 6 12 34 56 78',
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2025-05-20'),
      bio: 'Professeure expérimentée en mathématiques et sciences.',
      prixParHeure: 35,
      anneesExperience: 8,
      totalCours: 156,
      ratingMoyen: 4.8,
      specialites: ['Mathématiques', 'Physique', 'Chimie'],
      certifications: [],
      education: [],
      languages: [
        { code: 'fr', name: 'Français', level: 'Native' },
        { code: 'en', name: 'Anglais', level: 'C1' }
      ],
      isVerified: true,
      isAvailable: true,
      timezone: 'Europe/Paris'
    };

    return of(mockTuteur).pipe(delay(this.DELAY_MS));
  }
}