import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';


@Component({
  selector: 'app-featured-courses',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,ButtonModule,
    ButtonModule,
    DataViewModule,
    SelectButtonModule
  ],
  templateUrl: './featured-courses.component.html',
  styleUrls: ['./featured-courses.component.css']
})
export class FeaturedCoursesComponent implements OnInit {
  @Input() courses: any[] = [];
  
  // Fix the type to match PrimeNG's DataView expected type
  layout: 'list' | 'grid' = 'grid';
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  navigateToCourseDetails(courseId: number): void {
    this.router.navigate(['/course-offers', courseId]);
  }
  
  truncateDescription(description: string, maxLength: number = 120): string {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substr(0, maxLength) + '...';
  }
}