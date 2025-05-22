// src/app/tuteur-dashboard-overview/tuteur-dashboard-overview.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuteurBookingService } from '../core/services/tuteur-booking.service';
import { CourseOfferService } from '../core/services/course-offer.service';
import { MentoringService } from '../core/services/mentoring.service';
import { RatingService } from '../core/services/rating.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart'; // Re-added ChartModule
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-tuteur-dashboard-overview',
  standalone: true,
  templateUrl: './tuteur-dashboard-overview.component.html',
  styleUrls: ['./tuteur-dashboard-overview.component.css'], // Changed from .scss to .css
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    SkeletonModule,
    TagModule,
    ChartModule, // Re-added ChartModule
    ToastModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ProgressBarModule,
    ConfirmDialogModule,
    TooltipModule,
    // Removed duplicate CommonModule imports
  ],
  providers: [ConfirmationService, MessageService]
})
export class TuteurDashboardOverviewComponent implements OnInit {
  tuteur: any = null;
  dashboardStats: any = {};
  recentActivity: any[] = [];
  upcomingClasses: any[] = [];
  pendingRequests: any[] = [];
  loading = true;

  // Chart data
  earningsChartData: any;
  bookingsChartData: any;
  chartOptions: any;

  constructor(
    private tuteurBookingService: TuteurBookingService,
    private courseOfferService: CourseOfferService,
    private mentoringService: MentoringService,
    private ratingService: RatingService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.initializeCharts();
  }

  private async loadDashboardData(): Promise<void> {
    try {
      // Load all data in parallel (commented mentoring for now)
      const [tuteur, bookingStats, offers, pendingBookings, ratings] = await Promise.all([
        this.tuteurBookingService.getCurrentTuteur().toPromise(),
        this.tuteurBookingService.getBookingStats('tuteur-001').toPromise(),
        this.courseOfferService.getCourseOffers('tuteur-001').toPromise(),
        this.tuteurBookingService.getPendingBookings('tuteur-001').toPromise(),
        // this.mentoringService.getMentoringRequests('tuteur-001').toPromise(),
        this.ratingService.getRatingStats('tuteur-001').toPromise()
      ]);

      this.tuteur = tuteur;
      this.dashboardStats = {
        ...bookingStats,
        activeOffers: offers?.filter((o: any) => o.isActive).length || 0,
        totalOffers: offers?.length || 0,
        pendingMentoring: 0, // Mock data for now
        ...ratings
      };
      
      this.pendingRequests = [...(pendingBookings || [])]; // Removed mentoring for now
      this.generateRecentActivity();
      this.generateUpcomingClasses();
      this.updateChartData();
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les données du tableau de bord'
      });
    } finally {
      this.loading = false;
    }
  }

  private initializeCharts(): void {
    this.chartOptions = {
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }

  private updateChartData(): void {
    // Earnings chart
    this.earningsChartData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
      datasets: [{
        label: 'Revenus (€)',
        data: [1200, 1500, 1800, 2100, 2450],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }]
    };

    // Bookings chart
    this.bookingsChartData = {
      labels: ['Acceptées', 'En attente', 'Terminées', 'Annulées'],
      datasets: [{
        data: [
          this.dashboardStats.accepted || 0,
          this.dashboardStats.pending || 0,
          this.dashboardStats.completed || 0,
          this.dashboardStats.cancelled || 0
        ],
        backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
        borderWidth: 0
      }]
    };
  }

  private generateRecentActivity(): void {
    this.recentActivity = [
      {
        type: 'booking',
        title: 'Nouvelle réservation reçue',
        description: 'Jean Martin - Algèbre Linéaire',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: 'pi-calendar',
        color: 'success'
      },
      {
        type: 'rating',
        title: 'Nouvelle évaluation',
        description: '5 étoiles de Sophie Durand',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        icon: 'pi-star',
        color: 'warning'
      },
      {
        type: 'mentoring',
        title: 'Demande de mentorat',
        description: 'Emma Rousseau - Projet de fin d\'études',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        icon: 'pi-users',
        color: 'info'
      },
      {
        type: 'offer',
        title: 'Offre de cours créée',
        description: 'Mécanique Quantique - Niveau Avancé',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        icon: 'pi-book',
        color: 'primary'
      }
    ];
  }

  private generateUpcomingClasses(): void {
    this.upcomingClasses = [
      {
        id: 'class-1',
        studentName: 'Lucas Bernard',
        courseTitle: 'Algèbre Linéaire',
        scheduledTime: new Date('2025-05-24T14:00:00'),
        duration: 120,
        type: 'course',
        status: 'confirmed',
        studentAvatar: '/api/placeholder/40/40'
      },
      {
        id: 'class-2',
        studentName: 'Sophie Durand',
        courseTitle: 'Mécanique Quantique',
        scheduledTime: new Date('2025-05-26T10:00:00'),
        duration: 180,
        type: 'course',
        status: 'confirmed',
        studentAvatar: '/api/placeholder/40/40'
      },
      {
        id: 'class-3',
        studentName: 'Emma Rousseau',
        courseTitle: 'Mentorat - Projet de recherche',
        scheduledTime: new Date('2025-05-27T16:00:00'),
        duration: 90,
        type: 'mentoring',
        status: 'pending',
        studentAvatar: '/api/placeholder/40/40'
      }
    ];
  }

  // Navigation methods
  navigateToOffers(): void {
    this.router.navigate(['/tuteur/offers']);
  }

  navigateToBookings(): void {
    this.router.navigate(['/tuteur/bookings']);
  }

  navigateToMentoring(): void {
    this.router.navigate(['/tuteur/mentoring']);
  }

  navigateToAvailability(): void {
    this.router.navigate(['/tuteur/availability']);
  }

  navigateToRatings(): void {
    this.router.navigate(['/tuteur/ratings']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/tuteur/profile']);
  }

  // Quick actions
  createNewOffer(): void {
    this.router.navigate(['/tuteur/offers/new']);
  }

  viewAllBookings(): void {
    this.router.navigate(['/tuteur/bookings']);
  }

  openCalendar(): void {
    this.router.navigate(['/tuteur/calendar']);
  }

  // Utility methods
  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Il y a ${hours}h`;
    return 'À l\'instant';
  }

  formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getActivityIconClass(type: string): string {
    const iconMap: { [key: string]: string } = {
      booking: 'pi-calendar',
      rating: 'pi-star',
      mentoring: 'pi-users',
      offer: 'pi-book',
      payment: 'pi-credit-card'
    };
    return iconMap[type] || 'pi-info-circle';
  }

  getStatusSeverity(status: string): string {
    const severityMap: { [key: string]: string } = {
      confirmed: 'success',
      pending: 'warning',
      cancelled: 'danger',
      completed: 'info'
    };
    return severityMap[status] || 'info';
  }
}