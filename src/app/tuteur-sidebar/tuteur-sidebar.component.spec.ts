import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuteurSidebarComponent } from './tuteur-sidebar.component';

describe('TuteurSidebarComponent', () => {
  let component: TuteurSidebarComponent;
  let fixture: ComponentFixture<TuteurSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuteurSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuteurSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
