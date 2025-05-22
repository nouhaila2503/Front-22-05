import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    // Check if route requires specific role
    const requiredRole = route.data['role'];
    if (requiredRole && !authService.hasRole(requiredRole)) {
      // User is logged in but doesn't have the required role
      router.navigate(['/']);
      return false;
    }
    
    return true;
  }
  
  // User is not logged in, redirect to login page with return URL
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

export const roleGuard = (requiredRole: string): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if (authService.isLoggedIn() && authService.hasRole(requiredRole)) {
      return true;
    }
    
    if (authService.isLoggedIn()) {
      // User is logged in but doesn't have the required role
      router.navigate(['/unauthorized']);
      return false;
    }
    
    // User is not logged in, redirect to login page with return URL
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  };
};