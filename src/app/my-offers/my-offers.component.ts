// src/app/my-offers/my-offers.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CourseOfferService } from '../core/services/course-offer.service';
import { CourseOffer } from '../core/models/course-offer.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

import { SkeletonModule } from 'primeng/skeleton'; // ADD THIS


@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,SkeletonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    TagModule,
    ProgressBarModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
  providers: [ConfirmationService, MessageService]
})
export class MyOffersComponent implements OnInit {
  offers: CourseOffer[] = [];
  loading = true;
  totalRecords = 0;
  
  // Table configuration
  first = 0;
  rows = 10;
  
  // Filters
  searchValue = '';
  selectedStatus: string | null = null;
  selectedNiveau: string | null = null;
  
  // Filter options
  statusOptions = [
    { label: 'Toutes', value: null },
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];
  
  niveauOptions = [
    { label: 'Tous', value: null },
    { label: 'Débutant', value: 'Débutant' },
    { label: 'Intermédiaire', value: 'Intermédiaire' },
    { label: 'Avancé', value: 'Avancé' }
  ];

  // Bulk operations
  selectedOffers: CourseOffer[] = [];

  constructor(
    private courseOfferService: CourseOfferService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.loading = true;
    this.courseOfferService.getCourseOffers('tuteur-001').subscribe({
      next: (offers) => {
        this.offers = offers;
        this.totalRecords = offers.length;
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Erreur lors du chargement des offres:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les offres de cours'
        });
        this.loading = false;
      }
    });
  }

  // Navigation methods
  createNewOffer(): void {
    this.router.navigate(['/tuteur/offers/new']);
  }

  editOffer(offer: CourseOffer): void {
    this.router.navigate(['/tuteur/offers/edit', offer.id]);
  }

  viewOffer(offer: CourseOffer): void {
    this.router.navigate(['/tuteur/offers/view', offer.id]);
  }

  // CRUD operations
  deleteOffer(offer: CourseOffer): void {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer l'offre "${offer.title}" ?`,
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui, supprimer',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.courseOfferService.deleteCourseOffer(offer.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Offre supprimée avec succès'
            });
            this.loadOffers(); // Reload the list
          },
          error: (error: Error) => {
            console.error('Erreur lors de la suppression:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Impossible de supprimer l\'offre'
            });
          }
        });
      }
    });
  }

  toggleOfferStatus(offer: CourseOffer): void {
    const newStatus = !offer.isActive;
    const actionText = newStatus ? 'activer' : 'désactiver';
    
    this.confirmationService.confirm({
      message: `Voulez-vous ${actionText} l'offre "${offer.title}" ?`,
      header: 'Confirmation',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Oui',
      rejectLabel: 'Annuler',
      accept: () => {
        // Mock implementation
        offer.isActive = newStatus;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Offre ${newStatus ? 'activée' : 'désactivée'} avec succès`
        });
      }
    });
  }

  duplicateOffer(offer: CourseOffer): void {
    this.confirmationService.confirm({
      message: `Voulez-vous dupliquer l'offre "${offer.title}" ?`,
      header: 'Dupliquer l\'offre',
      icon: 'pi pi-copy',
      acceptLabel: 'Oui, dupliquer',
      rejectLabel: 'Annuler',
      accept: () => {
        const duplicatedOffer = {
          ...offer,
          title: `${offer.title} (Copie)`,
          isActive: false,
          currentStudents: 0
        };
        delete (duplicatedOffer as any).id;
        delete (duplicatedOffer as any).createdAt;
        delete (duplicatedOffer as any).updatedAt;

        this.courseOfferService.createCourseOffer(duplicatedOffer).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Offre dupliquée avec succès'
            });
            this.loadOffers();
          },
          error: (error: Error) => {
            console.error('Erreur lors de la duplication:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Impossible de dupliquer l\'offre'
            });
          }
        });
      }
    });
  }

  // Filter methods
  applyGlobalFilter(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchValue = target.value;
  }

  clearFilters(): void {
    this.searchValue = '';
    this.selectedStatus = null;
    this.selectedNiveau = null;
  }

  // Utility methods
  getSeverity(isActive: boolean): string {
    return isActive ? 'success' : 'danger';
  }

  getStatusLabel(isActive: boolean): string {
    return isActive ? 'Active' : 'Inactive';
  }

  getNiveauSeverity(niveau: string): string {
    switch (niveau) {
      case 'Débutant': return 'info';
      case 'Intermédiaire': return 'warning';
      case 'Avancé': return 'danger';
      default: return 'info';
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  }

  formatPrice(price: number): string {
    return `${price}€/h`;
  }

  getBookingRate(current: number, max: number): number {
    return max > 0 ? Math.round((current / max) * 100) : 0;
  }

  getBookingRateSeverity(rate: number): string {
    if (rate >= 80) return 'success';
    if (rate >= 50) return 'warning';
    return 'danger';
  }

  // Export functionality
  exportOffers(): void {
    // Mock implementation - in real app, would generate Excel/PDF
    this.messageService.add({
      severity: 'info',
      summary: 'Export',
      detail: 'Fonctionnalité d\'export en cours de développement'
    });
  }

  // Bulk operations
  onSelectionChange(selectedOffers: CourseOffer[]): void {
    this.selectedOffers = selectedOffers;
  }

  bulkActivate(): void {
    if (this.selectedOffers.length === 0) return;

    this.confirmationService.confirm({
      message: `Voulez-vous activer les ${this.selectedOffers.length} offres sélectionnées ?`,
      header: 'Activation en lot',
      icon: 'pi pi-check-circle',
      acceptLabel: 'Oui, activer',
      rejectLabel: 'Annuler',
      accept: () => {
        // Mock implementation
        this.selectedOffers.forEach(offer => {
          offer.isActive = true;
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `${this.selectedOffers.length} offres activées`
        });
        this.selectedOffers = [];
      }
    });
  }

  bulkDeactivate(): void {
    if (this.selectedOffers.length === 0) return;

    this.confirmationService.confirm({
      message: `Voulez-vous désactiver les ${this.selectedOffers.length} offres sélectionnées ?`,
      header: 'Désactivation en lot',
      icon: 'pi pi-times-circle',
      acceptLabel: 'Oui, désactiver',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'p-button-warning',
      accept: () => {
        // Mock implementation
        this.selectedOffers.forEach(offer => {
          offer.isActive = false;
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `${this.selectedOffers.length} offres désactivées`
        });
        this.selectedOffers = [];
      }
    });
  }
}