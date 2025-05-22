import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MentoringService } from '../core/services/mentoring.service';

// mentoring-requests-table.component.ts
import { CommonModule, DatePipe } from '@angular/common'; // Add DatePipe
import { RouterModule } from '@angular/router';

// PrimeNG imports
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button'; 

import { EventEmitter, Input, Output } from '@angular/core';


// PrimeNG imports
import { MenuModule } from 'primeng/menu';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-mentoring-requests-table',
  templateUrl: './mentoring-requests-table.component.html',
  styleUrls: ['./mentoring-requests-table.component.css'],
    imports: [
    CommonModule,
    TableModule,
    DatePipe, // Make sure to add DatePipe for date formatting,
    RouterModule,
    AvatarModule,
    MenuModule,
    ButtonModule,
    TagModule,
    SkeletonModule
  ],
})
export class MentoringRequestsTableComponent implements OnInit {
  mentoringRequests: any[] = [];
  loading: boolean = true;
  
  constructor(
    private router: Router,
    private mentoringService: MentoringService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadMentoringRequests();
  }
  
  loadMentoringRequests(): void {
    this.loading = true;
    this.mentoringService.getRecentMentoringRequests().subscribe({
      next: (requests) => {
        this.mentoringRequests = requests;
        this.loading = false;
      },
  error: (err: Error) => { 
        console.error('Error loading mentoring requests', err);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load mentoring request data'
        });
      }
    });
  }
  
  viewDetails(requestId: number): void {
    this.router.navigate(['/mentoring', requestId]);
  }
  
  confirmCancel(request: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel this mentoring request?',
      header: 'Cancel Mentoring Request',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cancelRequest(request);
      }
    });
  }
  
  cancelRequest(request: any): void {
    this.mentoringService.cancelMentoringRequest(request.id).subscribe({
      next: () => {
        // Update the request status locally
        const index = this.mentoringRequests.findIndex(r => r.id === request.id);
        if (index !== -1) {
          this.mentoringRequests[index].status = 'Cancelled';
        }
        
        this.messageService.add({
          severity: 'success',
          summary: 'Request Cancelled',
          detail: 'Your mentoring request has been cancelled successfully'
        });
      },
  error: (err: Error) => { 
        console.error('Error cancelling mentoring request', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to cancel mentoring request'
        });
      }
    });
  }
  
  createMentoringRequest(): void {
    // This will be handled by a dialog in the parent component
    this.messageService.add({
      severity: 'info',
      summary: 'Create Request',
      detail: 'Opening mentoring request form'
    });
  }
  
  getStatusSeverity(status: string): string {
    switch(status) {
      case 'Pending': return 'warning';
      case 'Accepted': return 'success';
      case 'Rejected': return 'danger';
      case 'Cancelled': return 'secondary';
      default: return 'secondary';
    }
  }
}