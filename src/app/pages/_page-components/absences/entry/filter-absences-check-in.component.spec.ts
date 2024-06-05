import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAbsencesCheckInComponent } from './filter-absences-check-in.component';

describe('FilterAbsencesCheckInComponent', () => {
  let component: FilterAbsencesCheckInComponent;
  let fixture: ComponentFixture<FilterAbsencesCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAbsencesCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAbsencesCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
