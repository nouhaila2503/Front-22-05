import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsTableComponent } from './bookings-table.component';

describe('BookingsTableComponent', () => {
  let component: BookingsTableComponent;
  let fixture: ComponentFixture<BookingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
