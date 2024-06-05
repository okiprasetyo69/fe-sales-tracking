import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDeliveryPlanComponent } from './filter-delivery-plan.component';

describe('FilterDeliveryPlanComponent', () => {
  let component: FilterDeliveryPlanComponent;
  let fixture: ComponentFixture<FilterDeliveryPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDeliveryPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDeliveryPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
