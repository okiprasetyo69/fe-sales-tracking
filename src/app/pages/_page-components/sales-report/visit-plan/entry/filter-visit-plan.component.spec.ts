import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterVisitPlanComponent } from './filter-visit-plan.component';

describe('FilterVisitPlanComponent', () => {
  let component: FilterVisitPlanComponent;
  let fixture: ComponentFixture<FilterVisitPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterVisitPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterVisitPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
