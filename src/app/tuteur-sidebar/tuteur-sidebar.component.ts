// src/app/components/tuteur-sidebar/tuteur-sidebar.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TuteurBookingService } from '../core/services/tuteur-booking.service';
import { Tuteur } from '../core/models/tuteur.model';

@Component({
  selector: 'app-tuteur-sidebar',
  templateUrl: './tuteur-sidebar.component.html',
  styleUrls: ['./tuteur-sidebar.component.scss']
})
export class TuteurSidebarComponent implements OnInit {
  tuteur: Tuteur | null = null;
  menuItems: MenuItem[] = [];
  loading = true;

  constructor(
    private tuteurBookingService: TuteurBookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTuteurData();
    this.initializeMenuItems();
  }

  private loadTuteurData(): void {
    this.tuteurBookingService.getCurrentTuteur().subscribe({
      next: (tuteur) => {
        this.tuteur = tuteur;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
        this.loading = false;
      }
    });
  }

  private initializeMenuItems(): void {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/tuteur/dashboard',
        styleClass: 'menu-item-dashboard'
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/tuteur/profile',
        styleClass: 'menu-item-profile'
      },
      {
        label: 'Mes Offres',
        icon: 'pi pi-book',
        routerLink: '/tuteur/offers',
        styleClass: 'menu-item-offers',
        badge: '12',
        badgeStyleClass: 'p-badge-info'
      },
      {
        label: 'Réservations',
        icon: 'pi pi-calendar',
        routerLink: '/tuteur/bookings',
        styleClass: 'menu-item-bookings',
        badge: '3',
        badgeStyleClass: 'p-badge-warning'
      },
      {
        label: 'Demandes Mentorat',
        icon: 'pi pi-users',
        routerLink: '/tuteur/mentoring',
        styleClass: 'menu-item-mentoring',
        badge: '2',
        badgeStyleClass: 'p-badge-danger'
      },
      {
        label: 'Évaluations',
        icon: 'pi pi-star',
        routerLink: '/tuteur/ratings',
        styleClass: 'menu-item-ratings'
      },
      {
        separator: true
      },
      {
        label: 'Disponibilités',
        icon: 'pi pi-clock',
        routerLink: '/tuteur/availability',
        styleClass: 'menu-item-availability'
      },
      {
        label: 'Paramètres',
        icon: 'pi pi-cog',
        routerLink: '/tuteur/settings',
        styleClass: 'menu-item-settings'
      },
      {
        separator: true
      },
      {
        label: 'Aide & Support',
        icon: 'pi pi-question-circle',
        routerLink: '/tuteur/support',
        styleClass: 'menu-item-support'
      },
      {
        label: 'Déconnexion',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
        styleClass: 'menu-item-logout'
      }
    ];
  }

  logout(): void {
    // Implement logout logic
    console.log('Déconnexion...');
    this.router.navigate(['/login']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/tuteur/profile']);
  }

  getInitials(tuteur: Tuteur): string {
    if (!tuteur.firstName || !tuteur.lastName) return 'TU';
    return `${tuteur.firstName.charAt(0)}${tuteur.lastName.charAt(0)}`.toUpperCase();
  }

  getRatingStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('pi-star-fill');
    }
    
    if (hasHalfStar) {
      stars.push('pi-star-half-fill');
    }
    
    while (stars.length < 5) {
      stars.push('pi-star');
    }
    
    return stars;
  }
}