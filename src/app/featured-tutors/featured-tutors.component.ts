import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';



import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-featured-tutors',
  templateUrl: './featured-tutors.component.html',
  styleUrls: ['./featured-tutors.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CarouselModule,
    ChipModule
  ],
})
export class FeaturedTutorsComponent implements OnInit {
  @Input() tutors: any[] = [];
  
  responsiveOptions: any[];
  
  constructor(private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
  }
  
  navigateToTutorDetails(tutorId: number): void {
    this.router.navigate(['/tuteurs', tutorId]);
  }
  
  // Helper methods for rating display
  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getHasHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }

  getRemainingStars(rating: number): number[] {
    return Array(5 - Math.ceil(rating)).fill(0);
  }
}