// apprenant-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// PrimeNG imports
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { MessageService, ConfirmationService } from 'primeng/api';

// Your component imports
import { BookingsTableComponent } from '../bookings-table/bookings-table.component';
import { MentoringRequestsTableComponent } from '../mentoring-requests-table/mentoring-requests-table.component';

@Component({
  selector: 'app-apprenant-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // PrimeNG modules
    TabViewModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    TagModule,
    // Your components
    BookingsTableComponent,
    MentoringRequestsTableComponent
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './apprenant-dashboard.component.html',
  styleUrls: ['./apprenant-dashboard.component.css']
})
export class ApprenantDashboardComponent implements OnInit {
  // Sidebar properties
  sidebarCollapsed = false;
  activeMenuItem = 'dashboard';
  
  // Search and user
  searchQuery = '';
  user: any = {
    username: 'John Doe',
    photoUrl: null
  };
  
  // Activity tabs
  activityTabIndex = 0;
  
  // Mentoring dialog
  showMentoringDialog = false;
  isSubmitting = false;
  mentoringForm: FormGroup;
  
  // Options for dropdowns
  tutorOptions: any[] = [];
  moduleOptions: any[] = [];
  niveauOptions: any[] = [];
  
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.mentoringForm = this.fb.group({
      tuteurId: [null, Validators.required],
      moduleId: [null, Validators.required],
      niveauId: [null, Validators.required],
      message: [null, [Validators.required, Validators.minLength(50), Validators.maxLength(500)]]
    });
  }
  
  ngOnInit(): void {
    this.loadData();
    this.loadDropdownOptions();
  }
  
  loadData(): void {
    // Sample data loading for demo purposes
    this.tutorOptions = [
      { label: 'Prof. John Smith', value: 1, name: 'Prof. John Smith' },
      { label: 'Dr. Jane Doe', value: 2, name: 'Dr. Jane Doe' },
      { label: 'Prof. Robert Johnson', value: 3, name: 'Prof. Robert Johnson' }
    ];
    
    this.moduleOptions = [
      { label: 'Mathematics', value: 1, name: 'Mathematics' },
      { label: 'Physics', value: 2, name: 'Physics' },
      { label: 'Computer Science', value: 3, name: 'Computer Science' },
      { label: 'Chemistry', value: 4, name: 'Chemistry' }
    ];
  }
  
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  
  navigateTo(page: string): void {
    this.activeMenuItem = page;
    console.log('Navigating to:', page);
    // Add your navigation logic here
  }
  
  loadDropdownOptions(): void {
    // For demo, we'll use static options
    // In a real app, these would come from API calls
    
    this.tutorOptions = [
      { name: 'MathExpert', value: 301 },
      { name: 'PhysicsProf', value: 302 },
      { name: 'EnglishTeacher', value: 303 },
      { name: 'ChemistryPro', value: 304 }
    ];
    
    this.moduleOptions = [
      { name: 'Mathematics', value: 201 },
      { name: 'Physics', value: 202 },
      { name: 'English', value: 203 },
      { name: 'Chemistry', value: 204 },
      { name: 'Biology', value: 205 },
      { name: 'Computer Science', value: 206 }
    ];
    
    this.niveauOptions = [
      { name: 'Beginner', value: 1 },
      { name: 'Intermediate', value: 2 },
      { name: 'Advanced', value: 3 }
    ];
  }
  
  // Methods for action cards
  findTutor(): void {
    console.log('Finding tutor...');
    // Add navigation to tutor search page
  }
  
  bookSession(): void {
    console.log('Booking session...');
    // Add booking logic
  }
  
  openMentoringRequestForm(): void {
    this.showMentoringDialog = true;
    this.mentoringForm.reset();
  }
  
  submitMentoringRequest(): void {
    if (this.mentoringForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.mentoringForm.controls).forEach(key => {
        const control = this.mentoringForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    
    // Get form values
    const formData = this.mentoringForm.value;
    console.log('Submitting mentoring request:', formData);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Reset form and close dialog
      this.mentoringForm.reset();
      this.showMentoringDialog = false;
      
      // Show success message
      this.messageService.add({
        severity: 'success',
        summary: 'Request Sent',
        detail: 'Your mentoring request has been sent successfully.'
      });
      
      // Switch to mentoring tab
      this.activityTabIndex = 2; // Mentoring Requests tab
      
      this.isSubmitting = false;
    }, 1500);
  }
  
  logout(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to log out?',
      header: 'Confirm Logout',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Logging out...');
        // Add logout logic here
        this.messageService.add({
          severity: 'info',
          summary: 'Logged Out',
          detail: 'You have been logged out successfully.'
        });
      },
      reject: () => {
        console.log('Logout cancelled');
      }
    });
  }
}