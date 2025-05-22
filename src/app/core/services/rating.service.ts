// src/app/services/rating.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';

export interface Rating {
  id: string;
  apprenantId: string;
  apprenant?: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  tuteurId: string;
  courseOfferId?: string;
  courseOffer?: {
    id: string;
    title: string;
    module: {
      id: string;
      name: string;
    };
  };
  bookingId?: string;
  score: number; // 1-5
  comment: string;
  pros?: string[];
  cons?: string[];
  wouldRecommend: boolean;
  isVerified: boolean;
  helpfulVotes: number;
  reportCount: number;
  tuteurResponse?: {
    message: string;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private readonly DELAY_MS = 300;

  constructor() {}

  getRatings(tuteurId: string): Observable<Rating[]> {
    const mockRatings: Rating[] = [
      {
        id: 'rating-001',
        apprenantId: 'apprenant-001',
        apprenant: {
          id: 'apprenant-001',
          username: 'jean_martin',
          firstName: 'Jean',
          lastName: 'Martin',
          profilePicture: '/api/placeholder/60/60'
        },
        tuteurId,
        courseOfferId: 'offer-001',
        courseOffer: {
          id: 'offer-001',
          title: 'Cours d\'Algèbre Linéaire',
          module: {
            id: 'module-001',
            name: 'Algèbre Linéaire'
          }
        },
        bookingId: 'booking-001',
        score: 5,
        comment: 'Excellente professeure ! Les explications sont très claires et la méthode pédagogique est parfaite. J\'ai enfin compris les espaces vectoriels grâce à ses exemples concrets.',
        pros: [
          'Explications très claires',
          'Méthode pédagogique adaptée',
          'Disponible pour répondre aux questions',
          'Cours bien structuré'
        ],
        cons: [],
        wouldRecommend: true,
        isVerified: true,
        helpfulVotes: 8,
        reportCount: 0,
        tuteurResponse: {
          message: 'Merci beaucoup Jean ! C\'était un plaisir de vous accompagner dans votre apprentissage. Continuez comme ça !',
          createdAt: new Date('2025-05-15T14:30:00')
        },
        createdAt: new Date('2025-05-14T16:20:00'),
        updatedAt: new Date('2025-05-15T14:30:00')
      },
      {
        id: 'rating-002',
        apprenantId: 'apprenant-002',
        apprenant: {
          id: 'apprenant-002',
          username: 'sophie_durand',
          firstName: 'Sophie',
          lastName: 'Durand',
          profilePicture: '/api/placeholder/60/60'
        },
        tuteurId,
        courseOfferId: 'offer-002',
        courseOffer: {
          id: 'offer-002',
          title: 'Introduction à la Mécanique Quantique',
          module: {
            id: 'module-002',
            name: 'Mécanique Quantique'
          }
        },
        score: 4,
        comment: 'Très bon cours ! Marie maîtrise parfaitement son sujet. Quelques concepts restent difficiles mais c\'est normal vu la complexité du domaine. Je recommande !',
        pros: [
          'Expertise technique excellente',
          'Patiente avec les questions',
          'Bonne préparation du cours'
        ],
        cons: [
          'Rythme parfois un peu rapide'
        ],
        wouldRecommend: true,
        isVerified: true,
        helpfulVotes: 5,
        reportCount: 0,
        createdAt: new Date('2025-05-12T18:45:00'),
        updatedAt: new Date('2025-05-12T18:45:00')
      },
      {
        id: 'rating-003',
        apprenantId: 'apprenant-003',
        apprenant: {
          id: 'apprenant-003',
          username: 'lucas_bernard',
          firstName: 'Lucas',
          lastName: 'Bernard',
          profilePicture: '/api/placeholder/60/60'
        },
        tuteurId,
        courseOfferId: 'offer-001',
        courseOffer: {
          id: 'offer-001',
          title: 'Cours d\'Algèbre Linéaire',
          module: {
            id: 'module-001',
            name: 'Algèbre Linéaire'
          }
        },
        score: 5,
        comment: 'Marie m\'a énormément aidé pour préparer mon examen. Grâce à ses conseils méthodologiques et ses exercices ciblés, j\'ai obtenu une très bonne note. Merci !',
        pros: [
          'Conseils méthodologiques précieux',
          'Exercices adaptés au niveau',
          'Suivi personnalisé',
          'Encourageante'
        ],
        cons: [],
        wouldRecommend: true,
        isVerified: true,
        helpfulVotes: 12,
        reportCount: 0,
        tuteurResponse: {
          message: 'Félicitations pour votre réussite Lucas ! Votre motivation et votre travail ont payé. N\'hésitez pas à revenir si besoin.',
          createdAt: new Date('2025-05-10T09:15:00')
        },
        createdAt: new Date('2025-05-09T20:30:00'),
        updatedAt: new Date('2025-05-10T09:15:00')
      },
      {
        id: 'rating-004',
        apprenantId: 'apprenant-004',
        apprenant: {
          id: 'apprenant-004',
          username: 'emma_rousseau',
          firstName: 'Emma',
          lastName: 'Rousseau',
          profilePicture: '/api/placeholder/60/60'
        },
        tuteurId,
        courseOfferId: 'offer-002',
        courseOffer: {
          id: 'offer-002',
          title: 'Introduction à la Mécanique Quantique',
          module: {
            id: 'module-002',
            name: 'Mécanique Quantique'
          }
        },
        score: 4,
        comment: 'Cours très intéressant et professeure compétente. J\'aurais aimé plus d\'exercices pratiques mais dans l\'ensemble, très satisfaite de cette formation.',
        pros: [
          'Contenu de qualité',
          'Professeure compétente',
          'Bonne organisation'
        ],
        cons: [
          'Manque d\'exercices pratiques'
        ],
        wouldRecommend: true,
        isVerified: true,
        helpfulVotes: 3,
        reportCount: 0,
        createdAt: new Date('2025-05-08T15:20:00'),
        updatedAt: new Date('2025-05-08T15:20:00')
      },
      {
        id: 'rating-005',
        apprenantId: 'apprenant-005',
        apprenant: {
          id: 'apprenant-005',
          username: 'thomas_petit',
          firstName: 'Thomas',
          lastName: 'Petit',
          profilePicture: '/api/placeholder/60/60'
        },
        tuteurId,
        courseOfferId: 'offer-001',
        courseOffer: {
          id: 'offer-001',
          title: 'Cours d\'Algèbre Linéaire',
          module: {
            id: 'module-001',
            name: 'Algèbre Linéaire'
          }
        },
        score: 5,
        comment: 'Parfait ! Marie a su s\'adapter à mon niveau et mes difficultés. Les supports de cours sont excellents et j\'ai beaucoup progressé en peu de temps.',
        pros: [
          'Adaptation au niveau de l\'élève',
          'Supports de cours excellents',
          'Progression rapide',
          'Disponibilité'
        ],
        cons: [],
        wouldRecommend: true,
        isVerified: true,
        helpfulVotes: 7,
        reportCount: 0,
        createdAt: new Date('2025-05-05T11:10:00'),
        updatedAt: new Date('2025-05-05T11:10:00')
      }
    ];

    return of(mockRatings).pipe(delay(this.DELAY_MS));
  }

  getRatingStats(tuteurId: string): Observable<any> {
    return this.getRatings(tuteurId).pipe(
      map(ratings => {
        const totalRatings = ratings.length;
        const averageScore = totalRatings > 0 ? 
          ratings.reduce((sum, r) => sum + r.score, 0) / totalRatings : 0;
        
        const scoreDistribution = {
          5: ratings.filter(r => r.score === 5).length,
          4: ratings.filter(r => r.score === 4).length,
          3: ratings.filter(r => r.score === 3).length,
          2: ratings.filter(r => r.score === 2).length,
          1: ratings.filter(r => r.score === 1).length
        };

        const recommendationRate = totalRatings > 0 ?
          (ratings.filter(r => r.wouldRecommend).length / totalRatings) * 100 : 0;

        const totalHelpfulVotes = ratings.reduce((sum, r) => sum + r.helpfulVotes, 0);
        const verifiedRatings = ratings.filter(r => r.isVerified).length;

        return {
          totalRatings,
          averageScore: Math.round(averageScore * 10) / 10,
          scoreDistribution,
          recommendationRate: Math.round(recommendationRate),
          totalHelpfulVotes,
          verifiedRatings,
          recentRatings: ratings.slice(0, 3).map(r => ({
            score: r.score,
            comment: r.comment.substring(0, 100) + '...',
            studentName: r.apprenant?.firstName,
            date: r.createdAt
          }))
        };
      }),
      delay(this.DELAY_MS)
    );
  }

  getFilteredRatings(tuteurId: string, filters: {
    score?: number;
    dateFrom?: Date;
    dateTo?: Date;
    courseOfferId?: string;
    verified?: boolean;
  }): Observable<Rating[]> {
    return this.getRatings(tuteurId).pipe(
      map(ratings => {
        let filtered = ratings;

        if (filters.score) {
          filtered = filtered.filter(r => r.score === filters.score);
        }

        if (filters.dateFrom) {
          filtered = filtered.filter(r => new Date(r.createdAt) >= filters.dateFrom!);
        }

        if (filters.dateTo) {
          filtered = filtered.filter(r => new Date(r.createdAt) <= filters.dateTo!);
        }

        if (filters.courseOfferId) {
          filtered = filtered.filter(r => r.courseOfferId === filters.courseOfferId);
        }

        if (filters.verified !== undefined) {
          filtered = filtered.filter(r => r.isVerified === filters.verified);
        }

        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      })
    );
  }

  respondToRating(ratingId: string, response: string): Observable<Rating> {
    return this.getRatings('tuteur-001').pipe(
      map(ratings => {
        const rating = ratings.find(r => r.id === ratingId);
        if (!rating) throw new Error('Évaluation non trouvée');

        return {
          ...rating,
          tuteurResponse: {
            message: response,
            createdAt: new Date()
          },
          updatedAt: new Date()
        };
      }),
      delay(this.DELAY_MS)
    );
  }

  reportRating(ratingId: string, reason: string): Observable<boolean> {
    // Simulate reporting a rating
    return of(true).pipe(delay(this.DELAY_MS));
  }

  markRatingHelpful(ratingId: string): Observable<Rating> {
    return this.getRatings('tuteur-001').pipe(
      map(ratings => {
        const rating = ratings.find(r => r.id === ratingId);
        if (!rating) throw new Error('Évaluation non trouvée');

        return {
          ...rating,
          helpfulVotes: rating.helpfulVotes + 1,
          updatedAt: new Date()
        };
      }),
      delay(this.DELAY_MS)
    );
  }

  getRatingTrends(tuteurId: string, period: 'month' | 'quarter' | 'year'): Observable<any> {
    return this.getRatings(tuteurId).pipe(
      map(ratings => {
        // Simulate rating trends over time
        const trends = {
          averageScores: [
            { period: 'Jan 2025', score: 4.6 },
            { period: 'Fév 2025', score: 4.7 },
            { period: 'Mar 2025', score: 4.8 },
            { period: 'Avr 2025', score: 4.8 },
            { period: 'Mai 2025', score: 4.9 }
          ],
          totalRatingsPerMonth: [
            { period: 'Jan 2025', count: 12 },
            { period: 'Fév 2025', count: 15 },
            { period: 'Mar 2025', count: 18 },
            { period: 'Avr 2025', count: 20 },
            { period: 'Mai 2025', count: 8 }
          ],
          improvement: +0.3, // improvement since last period
          trending: 'up'
        };

        return trends;
      }),
      delay(this.DELAY_MS)
    );
  }
}