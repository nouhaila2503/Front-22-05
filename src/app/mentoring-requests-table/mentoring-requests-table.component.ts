// src/app/mentoring-requests-table/mentoring-requests-table.component.ts

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MentoringService } from '../core/services/mentoring.service';

import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button'; 
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-mentoring-requests-table',
  templateUrl: './mentoring-requests-table.component.html',
  standalone: true,
  styleUrls: ['./mentoring-requests-table.component.css'],
  imports: [
    CommonModule,
    DatePipe,
    RouterModule,
    FormsModule,
    TableModule,
    AvatarModule,
    MenuModule,
    ButtonModule,
    TagModule,
    SkeletonModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    ProgressBarModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    // Remove Output, EventEmitter, Input - these are decorators, not imports!
  ],
  providers: [ConfirmationService, MessageService]
})
export class MentoringRequestsTableComponent implements OnInit {
  @Input() requests: any[] = [];
  @Output() requestAccepted = new EventEmitter<any>();
  @Output() requestRejected = new EventEmitter<any>();

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