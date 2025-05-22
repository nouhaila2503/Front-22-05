import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedTutorsComponent } from './featured-tutors.component';

describe('FeaturedTutorsComponent', () => {
  let component: FeaturedTutorsComponent;
  let fixture: ComponentFixture<FeaturedTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedTutorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
