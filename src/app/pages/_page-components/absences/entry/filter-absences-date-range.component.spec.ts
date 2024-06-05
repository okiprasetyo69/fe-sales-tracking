import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAbsencesDateRangeComponent } from './filter-absences-date-range.component';

describe('FilterAbsencesDateRangeComponent', () => {
  let component: FilterAbsencesDateRangeComponent;
  let fixture: ComponentFixture<FilterAbsencesDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAbsencesDateRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAbsencesDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
