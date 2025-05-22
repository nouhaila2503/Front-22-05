import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
  activeStepIndex: number = -1;
  
  steps = [
    {
      title: 'Create Your Profile',
      description: 'Sign up and create your personalized profile, highlighting your learning needs and preferences.',
      icon: 'fas fa-user-plus',
      color: '#4CAF50', // Green
      active: false
    },
    {
      title: 'Find the Perfect Tutor',
      description: 'Browse through our qualified tutors, filtered by subject, price, availability, and reviews.',
      icon: 'fas fa-search',
      color: '#2196F3', // Blue
      active: false
    },
    {
      title: 'Book Your Sessions',
      description: 'Schedule sessions directly with your chosen tutor through our easy-to-use booking system.',
      icon: 'fas fa-calendar-alt',
      color: '#FF9800', // Orange
      active: false
    },
    {
      title: 'Learn & Succeed',
      description: 'Connect virtually or in-person for your tutoring sessions and achieve your learning goals.',
      icon: 'fas fa-graduation-cap',
      color: '#9C27B0', // Purple
      active: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Start the animation sequence for the steps
    setTimeout(() => this.animateSteps(), 500);
  }
  
  animateSteps(): void {
    // Sequentially activate each step with a delay
    this.steps.forEach((step, index) => {
      setTimeout(() => {
        step.active = true;
        this.activeStepIndex = index;
      }, index * 800); // Stagger each step animation
    });
  }
  
  setActive(index: number, isActive: boolean): void {
    this.steps[index].active = isActive;
  }
}