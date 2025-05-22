// herosection.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

// PrimeNG imports
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { ModuleService } from '../core/services/module.service';
import { DomaineService } from '../core/services/domaine.service';

@Component({
  selector: 'app-herosection',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    AutoCompleteModule
  ],
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css']
})
export class HeroSectionComponent implements OnInit { // Change to HeroSectionComponent
  searchForm: FormGroup;
  
  modules: any[] = [];
  filteredModules: any[] = [];
  
  domaines: any[] = [];
  
  niveaux: any[] = [
    { label: 'Beginner', value: 'BEGINNER' },
    { label: 'Intermediate', value: 'INTERMEDIATE' },
    { label: 'Advanced', value: 'ADVANCED' }
  ];
  
  priceRanges: any[] = [
    { label: 'Any Price', value: null },
    { label: 'Under 100 MAD', value: '0-100' },
    { label: '100-200 MAD', value: '100-200' },
    { label: '200-300 MAD', value: '200-300' },
    { label: 'Over 300 MAD', value: '300-1000' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private moduleService: ModuleService,
    private domaineService: DomaineService
  ) {
    this.searchForm = this.fb.group({
      moduleId: [null],
      domaineId: [null],
      niveau: [null],
      priceRange: [null]
    });
  }

  ngOnInit(): void {
    this.loadModules();
    this.loadDomaines();
    
    // Listen for domaine changes to filter modules
    this.searchForm.get('domaineId')?.valueChanges.subscribe(domaineId => {
      this.filterModulesByDomaine(domaineId);
    });
  }
  
  loadModules(): void {
    this.moduleService.getModules().subscribe(data => {
      this.modules = data;
      this.filteredModules = data;
    });
  }
  
  loadDomaines(): void {
    this.domaineService.getDomaines().subscribe(data => {
      this.domaines = data;
    });
  }
  
  filterModulesByDomaine(domaineId: number | null): void {
    if (!domaineId) {
      this.filteredModules = this.modules;
    } else {
      this.filteredModules = this.modules.filter(module => module.domaineId === domaineId);
    }
    
    // Reset the module selection if current module doesn't belong to the selected domain
    const currentModuleId = this.searchForm.get('moduleId')?.value;
    if (currentModuleId) {
      const moduleExists = this.filteredModules.some(m => m.id === currentModuleId);
      if (!moduleExists) {
        this.searchForm.patchValue({ moduleId: null });
      }
    }
  }
  
  filterModule(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredModules = this.modules.filter(
      module => module.name.toLowerCase().includes(query)
    );
  }

  search(): void {
    // Convert form values to query params
    const queryParams: any = {};
    
    Object.entries(this.searchForm.value).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        queryParams[key] = value;
      }
    });
    
    // Navigate to search page with filters
    this.router.navigate(['/search'], { queryParams });
  }
}