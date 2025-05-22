// src/app/components/pending-requests/pending-requests.component.ts

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TuteurBookingService } from '../core/services/tuteur-booking.service';
import { MentoringService } from '../core/services/mentoring.service';

interface PendingRequest {
  id: string;
  type: 'booking' | 'mentoring';
  studentName: string;
  studentAvatar: string;
  studentEmail: string;
  title: string;
  description: string;
  scheduledDate?: Date;
  timeSlot?: string;
  price?: number;
  duration?: number;
  urgency?: 'low' | 'medium' | 'high';
  message?: string;
  createdAt: Date;
  originalData: any;
}

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PendingRequestsComponent implements OnInit {
  pendingRequests: PendingRequest[] = [];
  loading = true;
  
  // Filters
  selectedType: string | null = null;
  selectedUrgency: string | null = null;
  searchValue = '';
  
  // Filter options
  typeOptions = [
    { label: 'Tous', value: null },
    { label: 'Réservations', value: 'booking' },
    { label: 'Mentorat', value: 'mentoring' }
  ];
  
  urgencyOptions = [
    { label: 'Toutes', value: null },
    { label: 'Faible', value: 'low' },
    { label: 'Moyenne', value: 'medium' },
    { label: 'Élevée', value: 'high' }
  ];

  // Stats
  stats = {
    total: 0,
    booking: 0,
    mentoring: 0,
    highUrgency: 0
  };

  constructor(
    private tuteurBookingService: TuteurBookingService,
    private mentoringService: MentoringService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  async loadPendingRequests(): Promise<void> {
    this.loading = true;
    
    try {
      // Mock data since we don't have proper mentoring service
      const bookingRequests = await this.tuteurBookingService.getPendingBookings('tuteur-001').toPromise();
      
      // Transform booking requests
      const bookingPendingRequests: PendingRequest[] = (bookingRequests || []).map(booking  => ({
        id: booking.id,
        type: 'booking' as const,
        studentName: `${booking.apprenant?.firstName} ${booking.apprenant?.lastName}`,
        studentAvatar: booking.apprenant?.profilePicture || '/api/placeholder/50/50',
        studentEmail: booking.apprenant?.email || '',
        title: booking.courseOffer?.title || 'Cours',
        description: booking.message || 'Demande de réservation',
        scheduledDate: booking.scheduledDate,
        timeSlot: `${booking.timeSlot.startTime} - ${booking.timeSlot.endTime}`,
        price: booking.totalPrice,
        duration: booking.estimatedDuration,
        message: booking.message,
        createdAt: booking.createdAt,
        originalData: booking
      }));

      // Mock mentoring requests
      const mentoringPendingRequests: PendingRequest[] = [
        {
          id: 'mentoring-001',
          type: 'mentoring',
          studentName: 'Emma Rousseau',
          studentAvatar: '/api/placeholder/50/50',
          studentEmail: 'emma.rousseau@email.com',
          title: 'Aide pour projet de fin d\'études',
          description: 'Je travaille sur un projet de recherche qui implique des transformations linéaires complexes.',
          urgency: 'high',
          message: 'Projet à rendre fin juin, besoin d\'aide urgente pour la partie théorique.',
          createdAt: new Date('2025-05-21T09:15:00'),
          originalData: {
            id: 'mentoring-001',
            goals: ['Maîtriser les espaces vectoriels', 'Comprendre les applications linéaires'],
            estimatedSessions: 8,
            budget: 400
          }
        },
        {
          id: 'mentoring-002',
          type: 'mentoring',
          studentName: 'Thomas Petit',
          studentAvatar: '/api/placeholder/50/50',
          studentEmail: 'thomas.petit@email.com',
          title: 'Préparation concours d\'entrée',
          description: 'Je prépare les concours d\'entrée en école d\'ingénieur en physique quantique.',
          urgency: 'medium',
          message: 'Concours en septembre, motivation très élevée.',
          createdAt: new Date('2025-05-22T18:30:00'),
          originalData: {
            id: 'mentoring-002',
            goals: ['Réviser les concepts clés', 'Résoudre des exercices type concours'],
            estimatedSessions: 12,
            budget: 600
          }
        }
      ];

      this.pendingRequests = [...bookingPendingRequests, ...mentoringPendingRequests];
      this.updateStats();
      
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les demandes en attente'
      });
    } finally {
      this.loading = false;
    }
  }

  updateStats(): void {
    this.stats = {
      total: this.pendingRequests.length,
      booking: this.pendingRequests.filter(r => r.type === 'booking').length,
      mentoring: this.pendingRequests.filter(r => r.type === 'mentoring').length,
      highUrgency: this.pendingRequests.filter(r => r.urgency === 'high').length
    };
  }

  // Accept/Reject actions
  acceptRequest(request: PendingRequest): void {
    const actionText = request.type === 'booking' ? 'réservation' : 'demande de mentorat';
    
    this.confirmationService.confirm({
      message: `Voulez-vous accepter cette ${actionText} de ${request.studentName} ?`,
      header: 'Accepter la demande',
      icon: 'pi pi-check-circle',
      acceptLabel: 'Oui, accepter',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        if (request.type === 'booking') {
          this.tuteurBookingService.acceptBooking(request.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Réservation acceptée avec succès'
              });
              this.removeRequestFromList(request.id);
            },
            error: (error : Error) => {
              console.error('Erreur:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Impossible d\'accepter la réservation'
              });
            }
          });
        } else {
          // Mock mentoring acceptance
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Demande de mentorat acceptée avec succès'
          });
          this.removeRequestFromList(request.id);
        }
      }
    });
  }

  rejectRequest(request: PendingRequest): void {
    const actionText = request.type === 'booking' ? 'réservation' : 'demande de mentorat';
    
    this.confirmationService.confirm({
      message: `Voulez-vous rejeter cette ${actionText} de ${request.studentName} ?`,
      header: 'Rejeter la demande',
      icon: 'pi pi-times-circle',
      acceptLabel: 'Oui, rejeter',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        if (request.type === 'booking') {
          this.tuteurBookingService.rejectBooking(request.id, 'Demande rejetée par le tuteur').subscribe({
            next: () => {
              this.messageService.add({
                severity: 'info',
                summary: 'Demande rejetée',
                detail: 'Réservation rejetée'
              });
              this.removeRequestFromList(request.id);
            },
            error: (error : Error) => {
              console.error('Erreur:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Impossible de rejeter la réservation'
              });
            }
          });
        } else {
          // Mock mentoring rejection
          this.messageService.add({
            severity: 'info',
            summary: 'Demande rejetée',
            detail: 'Demande de mentorat rejetée'
          });
          this.removeRequestFromList(request.id);
        }
      }
    });
  }

  removeRequestFromList(requestId: string): void {
    this.pendingRequests = this.pendingRequests.filter(r => r.id !== requestId);
    this.updateStats();
  }

  // Contact student
  contactStudent(request: PendingRequest): void {
    // Mock implementation - would open message dialog
    this.messageService.add({
      severity: 'info',
      summary: 'Message',
      detail: `Fonctionnalité de contact avec ${request.studentName} en cours de développement`
    });
  }

  // View details
  viewDetails(request: PendingRequest): void {
    // Mock implementation - would open details modal
    this.messageService.add({
      severity: 'info',
      summary: 'Détails',
      detail: `Affichage des détails pour ${request.studentName} en cours de développement`
    });
  }

  // Filter methods
  applyGlobalFilter(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchValue = target.value;
  }

  clearFilters(): void {
    this.searchValue = '';
    this.selectedType = null;
    this.selectedUrgency = null;
  }

  // Utility methods
  getTypeIcon(type: string): string {
    return type === 'booking' ? 'pi-calendar' : 'pi-users';
  }

  getTypeSeverity(type: string): string {
    return type === 'booking' ? 'info' : 'warning';
  }

  getTypeLabel(type: string): string {
    return type === 'booking' ? 'Réservation' : 'Mentorat';
  }

  getUrgencySeverity(urgency?: string): string {
    switch (urgency) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'info';
    }
  }

  getUrgencyLabel(urgency?: string): string {
    switch (urgency) {
      case 'high': return 'Élevée';
      case 'medium': return 'Moyenne';
      case 'low': return 'Faible';
      default: return 'Non définie';
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }

  formatPrice(price?: number): string {
    return price ? `${price}€` : 'Non défini';
  }

  formatDuration(minutes?: number): string {
    if (!minutes) return 'Non défini';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h${mins > 0 ? mins : ''}` : `${mins}min`;
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Il y a ${hours}h`;
    return 'À l\'instant';
  }

  // Bulk actions
  selectedRequests: PendingRequest[] = [];

  onSelectionChange(selectedRequests: PendingRequest[]): void {
    this.selectedRequests = selectedRequests;
  }

  bulkAccept(): void {
    if (this.selectedRequests.length === 0) return;

    this.confirmationService.confirm({
      message: `Voulez-vous accepter les ${this.selectedRequests.length} demandes sélectionnées ?`,
      header: 'Acceptation en lot',
      icon: 'pi pi-check-circle',
      acceptLabel: 'Oui, accepter',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        // Mock implementation
        this.selectedRequests.forEach(request => {
          this.removeRequestFromList(request.id);
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `${this.selectedRequests.length} demandes acceptées`
        });
        this.selectedRequests = [];
      }
    });
  }

  bulkReject(): void {
    if (this.selectedRequests.length === 0) return;

    this.confirmationService.confirm({
      message: `Voulez-vous rejeter les ${this.selectedRequests.length} demandes sélectionnées ?`,
      header: 'Rejet en lot',
      icon: 'pi pi-times-circle',
      acceptLabel: 'Oui, rejeter',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        // Mock implementation
        this.selectedRequests.forEach(request => {
          this.removeRequestFromList(request.id);
        });
        this.messageService.add({
          severity: 'info',
          summary: 'Demandes rejetées',
          detail: `${this.selectedRequests.length} demandes rejetées`
        });
        this.selectedRequests = [];
      }
    });
  }
}