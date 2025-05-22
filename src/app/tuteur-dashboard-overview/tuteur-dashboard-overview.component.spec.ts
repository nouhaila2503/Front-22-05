import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuteurDashboardOverviewComponent } from './tuteur-dashboard-overview.component';

describe('TuteurDashboardOverviewComponent', () => {
  let component: TuteurDashboardOverviewComponent;
  let fixture: ComponentFixture<TuteurDashboardOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuteurDashboardOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuteurDashboardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
