import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from '../core/services/user.service';
import { NotificationService } from '../core/services/notification.service';
import { MenubarModule } from 'primeng/menubar'; 

import { FormsModule } from '@angular/forms'; // Add this for ngModel

import { ButtonModule } from 'primeng/button'; // If you're using p-button
import { AvatarModule } from 'primeng/avatar'; // If you're using p-avatar

import { InputTextModule } from 'primeng/inputtext'; // If you're using p-inputtext


import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG imports



@Component({
  selector: 'app-topbar',
  imports : [CommonModule,MenubarModule,RouterModule,ButtonModule,AvatarModule,FormsModule,InputTextModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  menuItems: MenuItem[] = [];
  user: any = null;
  searchQuery: string = '';
  unreadNotifications: number = 0;
  loading: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadNotifications();
  }
  
  loadUserData(): void {
    this.loading = true;
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
        this.initializeMenu();
      },
      error: (err) => {
        console.error('Error loading user data', err);
        this.loading = false;
      }
    });
  }
  
  loadNotifications(): void {
    this.notificationService.getUnreadCount().subscribe({
      next: (count) => {
        this.unreadNotifications = count;
        this.initializeMenu();
      },
      error: (err) => {
        console.error('Error loading notifications', err);
      }
    });
  }
  
  initializeMenu(): void {
    this.menuItems = [
      {
        label: 'Notifications',
        icon: 'pi pi-bell',
        badge: this.unreadNotifications > 0 ? this.unreadNotifications.toString() : undefined,
        badgeStyleClass: 'p-badge-danger',
        command: () => this.showNotifications()
      },
      {
        label: this.user?.username || 'User',
        icon: 'pi pi-user',
        items: [
          {
            label: 'My Profile',
            icon: 'pi pi-user-edit',
            command: () => this.navigateTo('/profile')
          },
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            command: () => this.navigateTo('/settings')
          },
          { separator: true },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
          }
        ]
      }
    ];
  }
  
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
  
  search(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }
  
  showNotifications(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.unreadNotifications = 0;
        this.initializeMenu();
        this.navigateTo('/notifications');
      },
      error: (err) => {
        console.error('Error marking notifications as read', err);
      }
    });
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