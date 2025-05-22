import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOfferFormComponent } from './course-offer-form.component';

describe('CourseOfferFormComponent', () => {
  let component: CourseOfferFormComponent;
  let fixture: ComponentFixture<CourseOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseOfferFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
