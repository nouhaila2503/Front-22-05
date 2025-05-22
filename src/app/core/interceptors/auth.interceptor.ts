import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Skip interception for specific endpoints if needed
  if (req.url.includes('/api/auth/login') || req.url.includes('/api/auth/register')) {
    return next(req);
  }
  
  // Get the auth token
  const token = authService.getToken();
  
  // Clone the request and add token to authorization header if token exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          // Handle 401 Unauthorized error (token expired)
          authService.logout();
          router.navigate(['/login'], { 
            queryParams: { returnUrl: router.url, message: 'Your session has expired. Please log in again.' } 
          });
        } else if (error.status === 403) {
          // Handle 403 Forbidden error (insufficient permissions)
          router.navigate(['/unauthorized']);
        } else if (error.status === 0) {
          // Handle network error or server down
          console.error('Network error or server is unavailable');
        }
      }
      
      return throwError(() => error);
    })
  );
};