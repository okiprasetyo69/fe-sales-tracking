import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRouteEditComponent } from './delivery-route-edit.component';

describe('DeliveryRouteEditComponent', () => {
  let component: DeliveryRouteEditComponent;
  let fixture: ComponentFixture<DeliveryRouteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRouteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRouteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
