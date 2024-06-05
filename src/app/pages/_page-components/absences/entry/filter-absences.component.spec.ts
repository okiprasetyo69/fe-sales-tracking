import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAbsencesComponent } from './filter-absences.component';

describe('FilterAbsencesComponent', () => {
  let component: FilterAbsencesComponent;
  let fixture: ComponentFixture<FilterAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
