import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApprenantDashboardComponent } from './apprenant-dashboard/apprenant-dashboard.component';

export const routes: Routes = [


  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Add this line
  { path: 'home', component: HomeComponent },
  { path: 'apprenantdashboard', component: ApprenantDashboardComponent },

];
