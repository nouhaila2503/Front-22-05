import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApprenantDashboardComponent } from './apprenant-dashboard/apprenant-dashboard.component';
import { TuteurDashboardOverviewComponent } from './tuteur-dashboard-overview/tuteur-dashboard-overview.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { CourseOfferFormComponent } from './course-offer-form/course-offer-form.component';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { RatingComponent } from './rating/rating.component';
export const routes: Routes = [


  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Add this line
  { path: 'home', component: HomeComponent },
  { path: 'apprenantdashboard', component: ApprenantDashboardComponent },
  { path: 'tuteur/dashboard', component: TuteurDashboardOverviewComponent },
  { path: 'tuteur/offers', component: MyOffersComponent },
  { path: 'tuteur/offers/new', component: CourseOfferFormComponent },
  { path: 'tuteur/requests', component: PendingRequestsComponent },
  { path: 'tuteur/ratings', component: RatingComponent },
  { path: 'tuteur', redirectTo: '/tuteur/dashboard', pathMatch: 'full' },


];
