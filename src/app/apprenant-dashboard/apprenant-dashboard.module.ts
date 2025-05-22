import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG Modules
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

// Components
import { ApprenantDashboardComponent } from './apprenant-dashboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { BookingsTableComponent } from '../bookings-table/bookings-table.component';
import { MentoringRequestsTableComponent } from '../mentoring-requests-table/mentoring-requests-table.component';

@NgModule({
  declarations: [
    ApprenantDashboardComponent,
    SidebarComponent,
    TopbarComponent,
    BookingsTableComponent,
    MentoringRequestsTableComponent
  ],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    
    // PrimeNG Modules
    AvatarModule,
    ButtonModule,
    CardModule,
    ChipModule,
    // PrimeNG Modules
    AvatarModule,
    ButtonModule,
    CardModule,
    ChipModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    MenuModule,
    MenubarModule,
    RatingModule,
    SkeletonModule,
    SplitterModule,
    TableModule,
    TabViewModule,
    TagModule,
    ToastModule,
    TooltipModule
  ],
  exports: [
    ApprenantDashboardComponent
  ],
  providers: [
    // Add any component-specific services here
  ]
})
export class ApprenantDashboardModule { }