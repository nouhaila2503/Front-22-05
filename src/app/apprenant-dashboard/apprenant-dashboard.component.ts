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
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // Add this for loading spinner
import { MessageService, ConfirmationService } from 'primeng/api';

// Service imports (not component imports - these should not be in the imports array)
import { MentoringService, EnhancedMentoringRequest, Tutor, Subject } from '../core/services/mentoring.service';

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
    // PrimeNG modules (Remove services from here - they don't belong in imports)
    TabViewModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    TagModule,
    ProgressSpinnerModule, // Add this for loading spinner
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
    email: 'john.doe@student.com', // Add email
    photoUrl: null
  };
  
  // Activity tabs
  activityTabIndex = 0;
  
  // Mentoring dialog
  showMentoringDialog = false;
  isSubmitting = false;
  isLoadingData = false;
  mentoringForm: FormGroup;
  
  // Data for dropdowns
  tutors: Tutor[] = [];
  subjects: Subject[] = [];
  tutorOptions: any[] = [];
  subjectOptions: any[] = [];
  levelOptions: any[] = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
    { label: 'Expert', value: 'expert' }
  ];
  priceRangeOptions: any[] = [
    { label: 'Under 30 MAD/hour', value: 'under-30' },
    { label: '30-40 MAD/hour', value: '30-40' },
    { label: '40-50 MAD/hour', value: '40-50' },
    { label: '50-60 MAD/hour', value: '50-60' },
    { label: 'Above 60 MAD/hour', value: 'above-60' },
    { label: 'Negotiable', value: 'negotiable' }
  ];
  
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private mentoringService: MentoringService
  ) {
    // Update form controls to match the new enhanced form
    this.mentoringForm = this.fb.group({
      studentName: [this.user?.username || '', [Validators.required, Validators.minLength(2)]],
      studentEmail: [this.user?.email || '', [Validators.required, Validators.email]],
      tutorId: [null, Validators.required],
      subjectId: [null, Validators.required],
      level: [null, Validators.required],
      priceRange: [null, Validators.required],
      note: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]]
    });
  }
  
  ngOnInit(): void {
    this.loadInitialData();
  }
  
  loadInitialData(): void {
    // Load tutors and subjects from the service
    this.loadTutors();
    this.loadSubjects();
  }
  
  loadTutors(): void {
    this.mentoringService.getTutors().subscribe({
      next: (tutors) => {
        this.tutors = tutors;
        this.tutorOptions = tutors.map(tutor => ({
          label: `${tutor.name} - ${tutor.hourlyRate} MAD/hr (${tutor.rating}⭐)`,
          value: tutor.id,
          tutor: tutor
        }));
      },
      error: (error) => {
        console.error('Error loading tutors:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load tutors'
        });
      }
    });
  }
  
  loadSubjects(): void {
    this.mentoringService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.subjectOptions = subjects.map(subject => ({
          label: `${subject.name} (${subject.category})`,
          value: subject.id,
          subject: subject
        }));
      },
      error: (error) => {
        console.error('Error loading subjects:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load subjects'
        });
      }
    });
  }
  
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  
  navigateTo(page: string): void {
    this.activeMenuItem = page;
    console.log('Navigating to:', page);
  }
  
  // Methods for action cards
  findTutor(): void {
    console.log('Finding tutor...');
  }
  
  bookSession(): void {
    console.log('Booking session...');
  }
  
  openMentoringRequestForm(): void {
    this.showMentoringDialog = true;
    // Pre-populate form with user data
    this.mentoringForm.patchValue({
      studentName: this.user?.username || '',
      studentEmail: this.user?.email || ''
    });
  }
  
  submitMentoringRequest(): void {
    if (this.mentoringForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.mentoringForm.controls).forEach(key => {
        const control = this.mentoringForm.get(key);
        control?.markAsTouched();
      });
      
      this.messageService.add({
        severity: 'warn',
        summary: 'Form Invalid',
        detail: 'Please fill in all required fields correctly'
      });
      return;
    }
    
    this.isSubmitting = true;
    const formData: EnhancedMentoringRequest = this.mentoringForm.value;
    
    this.mentoringService.sendEnhancedMentoringRequest(formData).subscribe({
      next: (response) => {
        // Reset form and close dialog
        this.mentoringForm.reset();
        this.showMentoringDialog = false;
        
        // Show success message
        this.messageService.add({
          severity: 'success',
          summary: 'Request Sent Successfully!',
          detail: response.message,
          life: 6000
        });
        
        // Switch to mentoring requests tab
        this.activityTabIndex = 2;
      },
      error: (error) => {
        console.error('Error submitting mentoring request:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Request Failed',
          detail: 'Failed to send mentoring request. Please try again.'
        });
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
  
  onTutorChange(event: any): void {
    const selectedTutor = this.tutors.find(t => t.id === event.value);
    if (selectedTutor) {
      console.log('Selected tutor:', selectedTutor);
    }
  }
  
  onSubjectChange(event: any): void {
    const selectedSubject = this.subjects.find(s => s.id === event.value);
    if (selectedSubject) {
      console.log('Selected subject:', selectedSubject);
    }
  }
  
  cancelMentoringRequest(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel? All entered data will be lost.',
      header: 'Confirm Cancel',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.mentoringForm.reset();
        this.showMentoringDialog = false;
      }
    });
  }
  
  logout(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to log out?',
      header: 'Confirm Logout',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Logging out...');
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

// Add these methods to your apprenant-dashboard.component.ts

// Add these methods at the end of your ApprenantDashboardComponent class, before the closing brace

getSelectedTutor(): Tutor | null {
  const tutorId = this.mentoringForm.get('tutorId')?.value;
  if (!tutorId) return null;
  
  const tutorOption = this.tutorOptions.find(t => t.value === tutorId);
  return tutorOption?.tutor || null;
}

getSelectedSubject(): Subject | null {
  const subjectId = this.mentoringForm.get('subjectId')?.value;
  if (!subjectId) return null;
  
  const subjectOption = this.subjectOptions.find(s => s.value === subjectId);
  return subjectOption?.subject || null;
}

getSelectedTutorName(): string {
  const tutorId = this.mentoringForm.get('tutorId')?.value;
  if (!tutorId) return '';
  
  const tutorOption = this.tutorOptions.find(t => t.value === tutorId);
  return tutorOption?.tutor?.name || '';
}

getSelectedTutorRate(): number {
  const tutorId = this.mentoringForm.get('tutorId')?.value;
  if (!tutorId) return 0;
  
  const tutorOption = this.tutorOptions.find(t => t.value === tutorId);
  return tutorOption?.tutor?.hourlyRate || 0;
}

}