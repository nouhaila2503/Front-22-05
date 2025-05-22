import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookingService } from '../core/services/booking.service';


// bookings-table.component.ts
import { CommonModule, DatePipe } from '@angular/common'; // Add DatePipe
import { RouterModule } from '@angular/router';

// PrimeNG imports
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button'; 


@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css'],
    imports: [
    CommonModule,
    RouterModule,
    TableModule,
    SkeletonModule,
    AvatarModule,
    TagModule,
    ButtonModule,
    DatePipe // Make sure to add DatePipe for date formatting
  ],
})
export class BookingsTableComponent implements OnInit {
  bookings: any[] = [];
  loading: boolean = true;
  
  constructor(
    private router: Router,
    private bookingService: BookingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadBookings();
  }
  
  loadBookings(): void {
    this.loading = true;
    this.bookingService.getRecentBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: (err: Error) => { 
        console.error('Error loading bookings', err);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load booking data'
        });
      }
    });
  }
  
  viewDetails(bookingId: number): void {
    this.router.navigate(['/bookings', bookingId]);
  }
  
  confirmCancel(booking: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel this booking?',
      header: 'Cancel Booking',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cancelBooking(booking);
      }
    });
  }
  
  cancelBooking(booking: any): void {
    this.bookingService.cancelBooking(booking.id).subscribe({
      next: () => {
        // Update the booking status locally
        const index = this.bookings.findIndex(b => b.id === booking.id);
        if (index !== -1) {
          this.bookings[index].status = 'Cancelled';
        }
        
        this.messageService.add({
          severity: 'success',
          summary: 'Booking Cancelled',
          detail: 'Your booking has been cancelled successfully'
        });
      },
  error: (err: Error) => { 
        console.error('Error cancelling booking', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to cancel booking'
        });
      }
    });
  }
  
  reschedule(bookingId: number): void {
    this.router.navigate(['/bookings', bookingId, 'reschedule']);
  }
  
  getStatusSeverity(status: string): string {
    switch(status) {
      case 'Pending': return 'warning';
      case 'Accepted': return 'success';
      case 'Rejected': return 'danger';
      case 'Cancelled': return 'secondary';
      case 'Completed': return 'info';
      default: return 'secondary';
    }
  }
  
  findTutors(): void {
    this.router.navigate(['/tutors']);
  }
}