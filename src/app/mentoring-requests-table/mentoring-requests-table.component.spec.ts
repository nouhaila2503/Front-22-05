import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentoringRequestsTableComponent } from './mentoring-requests-table.component';

describe('MentoringRequestsTableComponent', () => {
  let component: MentoringRequestsTableComponent;
  let fixture: ComponentFixture<MentoringRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentoringRequestsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentoringRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
