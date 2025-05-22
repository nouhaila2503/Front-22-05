// src/app/rating/rating.component.ts

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RatingService } from '../core/services/rating.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { ChartModule } from 'primeng/chart'; // Re-added ChartModule
import { SkeletonModule } from 'primeng/skeleton';

interface Rating {
  id: string;
  studentName: string;
  studentAvatar: string;
  courseTitle: string;
  score: number;
  comment: string;
  pros?: string[];
  cons?: string[];
  wouldRecommend: boolean;
  isVerified: boolean;
  helpfulVotes: number;
  tuteurResponse?: {
    message: string;
    createdAt: Date;
  };
  createdAt: Date;
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html', // Fixed template path
  styleUrls: ['./rating.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    TagModule,
    ToastModule,
    DialogModule,
    TextareaModule,
    CalendarModule,
    AvatarModule,
    RatingModule,
    ChartModule, // Re-added ChartModule
    SkeletonModule
  ],
  providers: [MessageService]
})
export class RatingComponent implements OnInit {
  ratings: Rating[] = [];
  filteredRatings: Rating[] = [];
  loading = true;
  
  // Stats
  ratingStats: any = {};
  
  // Filters
  selectedScore: number | null = null;
  selectedVerified: boolean | null = null;
  searchValue = '';
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  
  // Filter options
  scoreOptions = [
    { label: 'Toutes les notes', value: null },
    { label: '⭐⭐⭐⭐⭐ (5 étoiles)', value: 5 },
    { label: '⭐⭐⭐⭐ (4 étoiles)', value: 4 },
    { label: '⭐⭐⭐ (3 étoiles)', value: 3 },
    { label: '⭐⭐ (2 étoiles)', value: 2 },
    { label: '⭐ (1 étoile)', value: 1 }
  ];
  
  verificationOptions = [
    { label: 'Toutes', value: null },
    { label: 'Vérifiées', value: true },
    { label: 'Non vérifiées', value: false }
  ];

  // Response modal
  showResponseModal = false;
  selectedRating: Rating | null = null;
  responseText = '';

  constructor(
    private ratingService: RatingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadRatings();
    this.loadRatingStats();
  }

  loadRatings(): void {
    this.loading = true;
    this.ratingService.getRatings('tuteur-001').subscribe({
      next: (ratings) => {
        this.ratings = this.transformRatings(ratings);
        this.filteredRatings = [...this.ratings];
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des évaluations:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les évaluations'
        });
        this.loading = false;
      }
    });
  }

  loadRatingStats(): void {
    this.ratingService.getRatingStats('tuteur-001').subscribe({
      next: (stats: any) => {
        this.ratingStats = stats;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    });
  }

  transformRatings(rawRatings: any[]): Rating[] {
    return rawRatings.map(rating => ({
      id: rating.id,
      studentName: `${rating.apprenant?.firstName} ${rating.apprenant?.lastName}`,
      studentAvatar: rating.apprenant?.profilePicture || '/api/placeholder/50/50',
      courseTitle: rating.courseOffer?.title || 'Cours',
      score: rating.score,
      comment: rating.comment,
      pros: rating.pros || [],
      cons: rating.cons || [],
      wouldRecommend: rating.wouldRecommend,
      isVerified: rating.isVerified,
      helpfulVotes: rating.helpfulVotes,
      tuteurResponse: rating.tuteurResponse,
      createdAt: rating.createdAt
    }));
  }

  // Filter methods
  applyFilters(): void {
    let filtered = [...this.ratings];

    // Search filter
    if (this.searchValue) {
      filtered = filtered.filter(rating =>
        rating.studentName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        rating.courseTitle.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        rating.comment.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }

    // Score filter
    if (this.selectedScore !== null) {
      filtered = filtered.filter(rating => rating.score === this.selectedScore);
    }

    // Verification filter
    if (this.selectedVerified !== null) {
      filtered = filtered.filter(rating => rating.isVerified === this.selectedVerified);
    }

    // Date filters
    if (this.dateFrom) {
      filtered = filtered.filter(rating => new Date(rating.createdAt) >= this.dateFrom!);
    }

    if (this.dateTo) {
      filtered = filtered.filter(rating => new Date(rating.createdAt) <= this.dateTo!);
    }

    this.filteredRatings = filtered;
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchValue = target.value;
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchValue = '';
    this.selectedScore = null;
    this.selectedVerified = null;
    this.dateFrom = null;
    this.dateTo = null;
    this.applyFilters();
  }

  // Response methods
  openResponseModal(rating: Rating): void {
    this.selectedRating = rating;
    this.responseText = rating.tuteurResponse?.message || '';
    this.showResponseModal = true;
  }

  closeResponseModal(): void {
    this.showResponseModal = false;
    this.selectedRating = null;
    this.responseText = '';
  }

  saveResponse(): void {
    if (!this.selectedRating || !this.responseText.trim()) return;

    this.ratingService.respondToRating(this.selectedRating.id, this.responseText).subscribe({
      next: () => {
        // Update the rating in the list
        const index = this.ratings.findIndex(r => r.id === this.selectedRating!.id);
        if (index !== -1) {
          this.ratings[index].tuteurResponse = {
            message: this.responseText,
            createdAt: new Date()
          };
        }
        
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Réponse ajoutée avec succès'
        });
        
        this.closeResponseModal();
        this.applyFilters();
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de sauvegarder la réponse'
        });
      }
    });
  }

  // Utility methods
  getStarArray(score: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < score);
  }

  getScoreSeverity(score: number): string {
    if (score >= 4.5) return 'success';
    if (score >= 3.5) return 'warning';
    if (score >= 2.5) return 'info';
    return 'danger';
  }

  getScoreColor(score: number): string {
    if (score >= 4.5) return '#10b981';
    if (score >= 3.5) return '#f59e0b';
    if (score >= 2.5) return '#3b82f6';
    return '#ef4444';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);

    if (months > 0) return `Il y a ${months} mois`;
    if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    return 'Récemment';
  }

  getRecommendationText(wouldRecommend: boolean): string {
    return wouldRecommend ? 'Recommande' : 'Ne recommande pas';
  }

  getRecommendationSeverity(wouldRecommend: boolean): string {
    return wouldRecommend ? 'success' : 'danger';
  }

  // Export functionality
  exportRatings(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Export',
      detail: 'Fonctionnalité d\'export en cours de développement'
    });
  }

  // Report rating
  reportRating(rating: Rating): void {
    this.ratingService.reportRating(rating.id, 'Contenu inapproprié').subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Signalement',
          detail: 'Évaluation signalée, notre équipe va l\'examiner'
        });
      },
      error: (error) => {
        console.error('Erreur lors du signalement:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de signaler l\'évaluation'
        });
      }
    });
  }

  // Mark as helpful
  markAsHelpful(rating: Rating): void {
    this.ratingService.markRatingHelpful(rating.id).subscribe({
      next: () => {
        const index = this.ratings.findIndex(r => r.id === rating.id);
        if (index !== -1) {
          this.ratings[index].helpfulVotes++;
        }
        this.applyFilters();
      },
      error: (error) => {
        console.error('Erreur:', error);
      }
    });
  }

  // Get rating distribution for chart
  getRatingDistribution(): any {
    if (!this.ratingStats.scoreDistribution) return null;

    return {
      labels: ['1⭐', '2⭐', '3⭐', '4⭐', '5⭐'],
      datasets: [{
        data: [
          this.ratingStats.scoreDistribution[1] || 0,
          this.ratingStats.scoreDistribution[2] || 0,
          this.ratingStats.scoreDistribution[3] || 0,
          this.ratingStats.scoreDistribution[4] || 0,
          this.ratingStats.scoreDistribution[5] || 0
        ],
        backgroundColor: [
          '#ef4444',
          '#f97316',
          '#eab308',
          '#22c55e',
          '#10b981'
        ],
        borderWidth: 0
      }]
    };
  }

  getChartOptions(): any {
    return {
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }
}