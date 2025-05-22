import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home-cta',
  templateUrl: './home-cta.component.html',
  styleUrls: ['./home-cta.component.css']
})
export class HomeCTAComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getUserRole();
  }

  navigateToSearch(): void {
    this.router.navigate(['/search']);
  }

  navigateToRegister(role: string = ''): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/register'], { 
        queryParams: { role: role } 
      });
    }
  }
}