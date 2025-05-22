import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from '../core/services/user.service';

// PrimeNG imports
import { TagModule } from 'primeng/tag'; // Add this
import { MenuModule } from 'primeng/menu'; // Add this
import { ButtonModule } from 'primeng/button'; // Add this
import { SkeletonModule } from 'primeng/skeleton'; // Add this import
import { AvatarModule } from 'primeng/avatar'; // Add this import


import { CommonModule } from '@angular/common';  // Make sure this is imported
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports : [CommonModule,RouterModule,TagModule,MenuModule,ButtonModule,SkeletonModule,AvatarModule],
})
export class SidebarComponent implements OnInit {
  @Input() collapsed: boolean = false;
  @Output() toggle = new EventEmitter<void>();
  
  menuItems: MenuItem[] = [];
  user: any = null;
  loading: boolean = true;
  
  // Badge counters
  pendingBookings: number = 0;
  pendingMentoring: number = 0;
  unreadNotifications: number = 0;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadCounters();
  }
  
  loadUserData(): void {
    this.loading = true;
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
        this.initializeMenu();
      },
  error: (err: Error) => { 
        console.error('Error loading user data', err);
        this.loading = false;
      }
    });
  }
  
  loadCounters(): void {
    // Load badge counters for menu items
    this.userService.getPendingCounts().subscribe({
      next: (counters) => {
        this.pendingBookings = counters.bookings;
        this.pendingMentoring = counters.mentoring;
        this.unreadNotifications = counters.notifications;
        this.initializeMenu();
      },
  error: (err: Error) => { 
        console.error('Error loading counters', err);
      }
    });
  }
  
  initializeMenu(): void {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => this.navigateTo('/dashboard'),
        styleClass: this.router.url === '/dashboard' ? 'active-route' : ''
      },
      {
        label: 'Find Tutors',
        icon: 'pi pi-search',
        command: () => this.navigateTo('/tutors'),
        styleClass: this.router.url === '/tutors' ? 'active-route' : ''
      },
      {
        label: 'My Bookings',
        icon: 'pi pi-calendar',
        command: () => this.navigateTo('/bookings'),
        styleClass: this.router.url === '/bookings' ? 'active-route' : '',
        badge: this.pendingBookings > 0 ? this.pendingBookings.toString() : undefined,
        badgeStyleClass: 'p-badge-danger'
      },
      {
        label: 'Mentoring Requests',
        icon: 'pi pi-comments',
        command: () => this.navigateTo('/mentoring'),
        styleClass: this.router.url === '/mentoring' ? 'active-route' : '',
        badge: this.pendingMentoring > 0 ? this.pendingMentoring.toString() : undefined,
        badgeStyleClass: 'p-badge-danger'
      },
      {
        label: 'Notifications',
        icon: 'pi pi-bell',
        command: () => this.navigateTo('/notifications'),
        styleClass: this.router.url === '/notifications' ? 'active-route' : '',
        badge: this.unreadNotifications > 0 ? this.unreadNotifications.toString() : undefined,
        badgeStyleClass: 'p-badge-danger'
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => this.navigateTo('/settings'),
        styleClass: this.router.url === '/settings' ? 'active-route' : ''
      }
    ];
  }
  
  toggleSidebar(): void {
    this.toggle.emit();
  }
  
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  
  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
  error: (err: Error) => { 
        console.error('Error during logout', err);
      }
    });
  }
}