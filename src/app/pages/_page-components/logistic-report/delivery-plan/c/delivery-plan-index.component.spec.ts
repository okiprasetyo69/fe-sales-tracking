import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPlanIndexComponent } from './delivery-plan-index.component';

describe('DeliveryPlanIndexComponent', () => {
  let component: DeliveryPlanIndexComponent;
  let fixture: ComponentFixture<DeliveryPlanIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPlanIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPlanIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
