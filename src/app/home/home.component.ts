import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

// Components
import { HeroSectionComponent } from '../herosection/herosection.component';
import { FeaturedTutorsComponent } from '../featured-tutors/featured-tutors.component';
import { FeaturedCoursesComponent } from '../featured-courses/featured-courses.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';

// Services
import { HomeService } from '../core/services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule, 
    HeroSectionComponent,
    FeaturedTutorsComponent,
    FeaturedCoursesComponent,
    HowItWorksComponent
  ],
  providers: [MessageService, HomeService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredTutors: any[] = [];
  featuredCourses: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  
  // Track if data fetching has completed
  private tutorsLoaded: boolean = false;
  private coursesLoaded: boolean = false;

  constructor(
    private homeService: HomeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log('HomeComponent initialized');
    this.loadFeaturedContent();
  }

  loadFeaturedContent(): void {
    this.isLoading = true;
    
    // Get featured tutors
    this.homeService.getFeaturedTutors().subscribe({
      next: (tutors) => {
        console.log('Tutors loaded:', tutors);
        this.featuredTutors = tutors;
        this.tutorsLoaded = true;
        this.checkLoadingComplete();
      },
      error: (err) => {
        console.error('Error loading tutors:', err);
        this.tutorsLoaded = true; // Mark as loaded even on error
        this.handleError('Error loading featured tutors', err);
      }
    });
    
    // Get featured courses with improved error handling
    this.homeService.getFeaturedCourses().subscribe({
      next: (courses) => {
        console.log('Courses loaded successfully:', courses);
        
        // Check if courses is valid and has items
        if (courses && Array.isArray(courses)) {
          this.featuredCourses = courses;
          console.log(`Loaded ${this.featuredCourses.length} featured courses`);
        } else {
          console.warn('Courses data is not an array or is empty:', courses);
          this.featuredCourses = []; // Ensure it's an empty array if invalid data
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'No featured courses available at this time',
            life: 3000
          });
        }
        
        this.coursesLoaded = true;
        this.checkLoadingComplete();
      },
      error: (err) => {
        console.error('Error loading courses:', err);
        this.coursesLoaded = true; // Mark as loaded even on error
        this.handleError('Error loading featured courses', err);
      }
    });
  }

  private checkLoadingComplete(): void {
    // Check if both API calls have completed (success or error)
    if (this.tutorsLoaded && this.coursesLoaded) {
      this.isLoading = false;
      console.log('Loading complete. Showing content.');
      console.log('Feature tutors count:', this.featuredTutors.length);
      console.log('Feature courses count:', this.featuredCourses.length);
      
      // Add this check to help debug
      if (this.featuredCourses.length === 0) {
        console.warn('No courses to display - featured courses array is empty');
      }
    }
  }

  private handleError(message: string, err: any): void {
    console.error(message, err);
    this.error = message;
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000
    });
    
    // For development/testing only - add mock data if API fails
    if (message.includes('courses') && this.featuredCourses.length === 0) {
      console.log('Adding mock courses data for testing');
      this.featuredCourses = [
        { id: 1, title: 'Mock Course 1', instructor: 'Test Instructor' },
        { id: 2, title: 'Mock Course 2', instructor: 'Another Instructor' }
      ];
    }
  }
}