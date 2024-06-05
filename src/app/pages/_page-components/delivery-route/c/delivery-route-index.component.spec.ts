import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRouteIndexComponent } from './delivery-route-index.component';

describe('DeliveryRouteIndexComponent', () => {
  let component: DeliveryRouteIndexComponent;
  let fixture: ComponentFixture<DeliveryRouteIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRouteIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRouteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
