// src/app/components/course-offer-form/course-offer-form.component.ts

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CourseOfferService } from '../core/services/course-offer.service';
import { CourseOffer } from '../core/models/course-offer.model';
import { Domaine} from '../core/models/domaine.model';
import { Module } from '../core/models/module.model';
import { TimeSlot } from '../core/models/';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-course-offer-form',
  standalone : true,
  templateUrl: './course-offer-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    CheckboxModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  styleUrls: ['./course-offer-form.component.css'],
  providers: [MessageService]
})
export class CourseOfferFormComponent implements OnInit {
  offerForm!: FormGroup;
  minDate = new Date();
  isEditMode = false;
  offerId: string | null = null;
  loading = false;
  saving = false;
  
  // Options
  domaines: Domaine[] = [];
  modules: Module[] = [];
  niveauOptions = [
    { label: 'Débutant', value: 'Débutant' },
    { label: 'Intermédiaire', value: 'Intermédiaire' },
    { label: 'Avancé', value: 'Avancé' }
  ];
  
  locationTypes = [
    { label: 'En ligne', value: 'online' },
    { label: 'En présentiel', value: 'in-person' },
    { label: 'Hybride', value: 'hybrid' }
  ];
  
  platformOptions = [
    { label: 'Zoom', value: 'Zoom' },
    { label: 'Microsoft Teams', value: 'Teams' },
    { label: 'Google Meet', value: 'Meet' },
    { label: 'Discord', value: 'Discord' },
    { label: 'Autre', value: 'Other' }
  ];
  
  recurringTypes = [
    { label: 'Quotidien', value: 'daily' },
    { label: 'Hebdomadaire', value: 'weekly' },
    { label: 'Mensuel', value: 'monthly' }
  ];
  
  daysOfWeek = [
    { label: 'Lundi', value: 1 },
    { label: 'Mardi', value: 2 },
    { label: 'Mercredi', value: 3 },
    { label: 'Jeudi', value: 4 },
    { label: 'Vendredi', value: 5 },
    { label: 'Samedi', value: 6 },
    { label: 'Dimanche', value: 0 }
  ];

  // Form steps
  currentStep = 0;
  totalSteps = 4;
  stepTitles = [
    'Informations générales',
    'Détails du cours',
    'Créneaux horaires',
    'Finalisation'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseOfferService: CourseOfferService,
    private messageService: MessageService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadDomaines();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.offerForm = this.fb.group({
      // Step 1: General Info
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      domaineId: ['', Validators.required],
      moduleId: ['', Validators.required],
      niveau: ['', Validators.required],
      
      // Step 2: Course Details
      description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      prixParHeure: [35, [Validators.required, Validators.min(10), Validators.max(200)]],
      maxStudents: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      requirements: this.fb.array([]),
      materials: this.fb.array([]),
      tags: [''],
      
      // Step 3: Time Slots
      dateDisponibilite: [new Date(), Validators.required],
      creneaux: this.fb.array([]),
      
      // Step 4: Location & Final Details
      location: this.fb.group({
        type: ['online', Validators.required],
        platform: [''],
        meetingUrl: [''],
        address: [''],
        city: ['']
      })
    });

    // Add initial time slot
    this.addTimeSlot();
    
    // Watch for domaine changes to load modules
    this.offerForm.get('domaineId')?.valueChanges.subscribe(domaineId => {
      if (domaineId) {
        this.loadModulesByDomaine(domaineId);
      }
    });

    // Watch for location type changes
    this.offerForm.get('location.type')?.valueChanges.subscribe(type => {
      this.updateLocationValidators(type);
    });
  }

  checkEditMode(): void {
    this.offerId = this.route.snapshot.paramMap.get('id');
    if (this.offerId) {
      this.isEditMode = true;
      this.loadOfferForEdit();
    }
  }

  loadOfferForEdit(): void {
    if (!this.offerId) return;
    
    this.loading = true;
    // Mock implementation - in real app would load from service
    setTimeout(() => {
      const mockOffer = {
        id: this.offerId,
        title: 'Cours d\'Algèbre Linéaire - Niveau Licence',
        domaineId: 'domaine-001',
        moduleId: 'module-001',
        niveau: 'Intermédiaire',
        description: 'Maîtrisez les concepts fondamentaux de l\'algèbre linéaire : espaces vectoriels, applications linéaires, matrices et déterminants.',
        prixParHeure: 35,
        maxStudents: 3,
        requirements: ['Calculatrice scientifique', 'Cahier de notes'],
        materials: ['Manuel d\'algèbre linéaire', 'Exercices corrigés'],
        tags: ['licence', 'mathématiques', 'algèbre'],
        dateDisponibilite: new Date('2025-05-25'),
        creneaux: [
          {
            id: 'slot-001',
            startTime: '09:00',
            endTime: '11:00',
            isBooked: false,
            isRecurring: true,
            maxCapacity: 1,
            currentBookings: 0
          }
        ],
        location: {
          type: 'hybrid',
          platform: 'Zoom',
          meetingUrl: 'https://zoom.us/j/123456789',
          address: 'Bibliothèque universitaire',
          city: 'Paris'
        }
      };
      
      this.populateForm(mockOffer);
      this.loading = false;
    }, 1000);
  }

  populateForm(offer: any): void {
    // Clear existing arrays
    this.clearFormArray('requirements');
    this.clearFormArray('materials');
    this.clearFormArray('creneaux');
    
    // Populate basic fields
    this.offerForm.patchValue({
      title: offer.title,
      domaineId: offer.domaineId,
      moduleId: offer.moduleId,
      niveau: offer.niveau,
      description: offer.description,
      prixParHeure: offer.prixParHeure,
      maxStudents: offer.maxStudents,
      tags: offer.tags?.join(', ') || '',
      dateDisponibilite: offer.dateDisponibilite,
      location: offer.location
    });
    
    // Populate requirements
    offer.requirements?.forEach((req: string) => {
      this.addRequirement(req);
    });
    
    // Populate materials
    offer.materials?.forEach((mat: string) => {
      this.addMaterial(mat);
    });
    
    // Populate time slots
    offer.creneaux?.forEach((slot: any) => {
      this.addTimeSlot(slot);
    });
  }

  loadDomaines(): void {
    this.courseOfferService.getDomaines().subscribe({
      next: (domaines) => {
        this.domaines = domaines;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des domaines:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les domaines'
        });
      }
    });
  }

  loadModulesByDomaine(domaineId: string): void {
    this.courseOfferService.getModulesByDomaine(domaineId).subscribe({
      next: (modules) => {
        this.modules = modules;
        // Reset module selection if current module doesn't belong to new domaine
        const currentModuleId = this.offerForm.get('moduleId')?.value;
        if (currentModuleId && !modules.find(m => m.id === currentModuleId)) {
          this.offerForm.patchValue({ moduleId: '' });
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des modules:', error);
      }
    });
  }

  updateLocationValidators(type: string): void {
    const platformControl = this.offerForm.get('location.platform');
    const meetingUrlControl = this.offerForm.get('location.meetingUrl');
    const addressControl = this.offerForm.get('location.address');
    const cityControl = this.offerForm.get('location.city');

    // Clear existing validators
    platformControl?.clearValidators();
    meetingUrlControl?.clearValidators();
    addressControl?.clearValidators();
    cityControl?.clearValidators();

    // Set validators based on location type
    if (type === 'online' || type === 'hybrid') {
      platformControl?.setValidators([Validators.required]);
      meetingUrlControl?.setValidators([Validators.required, Validators.pattern(/^https?:\/\/.+/)]);
    }
    
    if (type === 'in-person' || type === 'hybrid') {
      addressControl?.setValidators([Validators.required]);
      cityControl?.setValidators([Validators.required]);
    }

    // Update validity
    platformControl?.updateValueAndValidity();
    meetingUrlControl?.updateValueAndValidity();
    addressControl?.updateValueAndValidity();
    cityControl?.updateValueAndValidity();
  }

  // Form Array Helpers - FIXED TYPING
  get requirementsArray(): FormArray {
    return this.offerForm.get('requirements') as FormArray;
  }

  get materialsArray(): FormArray {
    return this.offerForm.get('materials') as FormArray;
  }

  get creneauxArray(): FormArray {
    return this.offerForm.get('creneaux') as FormArray;
  }

  // Helper methods to get FormControl from FormArray - FIXED
  getRequirementControl(index: number): FormControl {
    return this.requirementsArray.at(index) as FormControl;
  }

  getMaterialControl(index: number): FormControl {
    return this.materialsArray.at(index) as FormControl;
  }

  getCreneauControl(index: number): FormGroup {
    return this.creneauxArray.at(index) as FormGroup;
  }

  addRequirement(value = ''): void {
    this.requirementsArray.push(this.fb.control(value, Validators.required));
  }

  removeRequirement(index: number): void {
    this.requirementsArray.removeAt(index);
  }

  addMaterial(value = ''): void {
    this.materialsArray.push(this.fb.control(value, Validators.required));
  }

  removeMaterial(index: number): void {
    this.materialsArray.removeAt(index);
  }

  addTimeSlot(slot?: any): void {
    const timeSlotGroup = this.fb.group({
      startTime: [slot?.startTime || '', Validators.required],
      endTime: [slot?.endTime || '', Validators.required],
      isRecurring: [slot?.isRecurring || false],
      recurringPattern: this.fb.group({
        type: [slot?.recurringPattern?.type || 'weekly'],
        interval: [slot?.recurringPattern?.interval || 1, [Validators.min(1), Validators.max(12)]],
        daysOfWeek: [slot?.recurringPattern?.daysOfWeek || []],
        endDate: [slot?.recurringPattern?.endDate || null],
        occurrences: [slot?.recurringPattern?.occurrences || null]
      }),
      maxCapacity: [slot?.maxCapacity || 1, [Validators.required, Validators.min(1)]]
    });

    this.creneauxArray.push(timeSlotGroup);
  }

  removeTimeSlot(index: number): void {
    this.creneauxArray.removeAt(index);
  }

  clearFormArray(arrayName: string): void {
    const formArray = this.offerForm.get(arrayName) as FormArray;
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  // Step Navigation
  nextStep(): void {
    if (this.currentStep < this.totalSteps - 1) {
      if (this.isStepValid(this.currentStep)) {
        this.currentStep++;
      } else {
        this.markStepFieldsAsTouched(this.currentStep);
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 0 && step < this.totalSteps) {
      this.currentStep = step;
    }
  }

  isStepValid(step: number): boolean {
    const stepFields = this.getStepFields(step);
    return stepFields.every(field => {
      const control = this.offerForm.get(field);
      return control && control.valid;
    });
  }

  getStepFields(step: number): string[] {
    switch (step) {
      case 0: return ['title', 'domaineId', 'moduleId', 'niveau'];
      case 1: return ['description', 'prixParHeure', 'maxStudents'];
      case 2: return ['dateDisponibilite', 'creneaux'];
      case 3: return ['location.type'];
      default: return [];
    }
  }

  markStepFieldsAsTouched(step: number): void {
    const stepFields = this.getStepFields(step);
    stepFields.forEach(field => {
      const control = this.offerForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Form Submission
  onSubmit(): void {
    if (this.offerForm.valid) {
      this.saving = true;
      const formData = this.prepareFormData();
      
      const saveObservable = this.isEditMode 
        ? this.courseOfferService.updateCourseOffer(this.offerId!, formData)
        : this.courseOfferService.createCourseOffer(formData);

      saveObservable.subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: this.isEditMode ? 'Offre modifiée avec succès' : 'Offre créée avec succès'
          });
          
          setTimeout(() => {
            this.router.navigate(['/tuteur/offers']);
          }, 1500);
        },
        error: (error) => {
          console.error('Erreur lors de la sauvegarde:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de sauvegarder l\'offre'
          });
          this.saving = false;
        }
      });
    } else {
      this.markAllFieldsAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulaire invalide',
        detail: 'Veuillez corriger les erreurs avant de continuer'
      });
    }
  }

  prepareFormData(): any {
    const formValue = this.offerForm.value;
    
    return {
      ...formValue,
      tuteurId: 'tuteur-001', // Would get from auth service
      tags: formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : [],
      isActive: true,
      currentStudents: 0
    };
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.offerForm.controls).forEach(key => {
      const control = this.offerForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Cancel and Reset
  onCancel(): void {
    this.router.navigate(['/tuteur/offers']);
  }

  resetForm(): void {
    this.offerForm.reset();
    this.currentStep = 0;
    this.clearFormArray('requirements');
    this.clearFormArray('materials');
    this.clearFormArray('creneaux');
    this.addTimeSlot();
  }

  // Utility Methods
  getFieldError(fieldName: string): string {
    const control = this.offerForm.get(fieldName);
    if (control && control.errors && control.touched) {
      if (control.errors['required']) return 'Ce champ est requis';
      if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} caractères`;
      if (control.errors['maxlength']) return `Maximum ${control.errors['maxlength'].requiredLength} caractères`;
      if (control.errors['min']) return `Valeur minimum: ${control.errors['min'].min}`;
      if (control.errors['max']) return `Valeur maximum: ${control.errors['max'].max}`;
      if (control.errors['pattern']) return 'Format invalide';
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.offerForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  getStepIcon(step: number): string {
    const icons = ['pi-info-circle', 'pi-book', 'pi-clock', 'pi-check-circle'];
    return icons[step] || 'pi-circle';
  }

  getStepClass(step: number): string {
    if (step === this.currentStep) return 'active';
    if (step < this.currentStep) return 'completed';
    return 'pending';
  }
}