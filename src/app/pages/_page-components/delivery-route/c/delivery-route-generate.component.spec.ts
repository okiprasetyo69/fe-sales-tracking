import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRouteGenerateComponent } from './delivery-route-generate.component';

describe('DeliveryRouteGenerateComponent', () => {
  let component: DeliveryRouteGenerateComponent;
  let fixture: ComponentFixture<DeliveryRouteGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRouteGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRouteGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
