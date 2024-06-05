import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRouteComponent } from './delivery-route.component';

describe('DeliveryRouteComponent', () => {
  let component: DeliveryRouteComponent;
  let fixture: ComponentFixture<DeliveryRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
