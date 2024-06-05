import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeliveryCycleModule} from "../delivery-cycle.module";
import {DeliveryDestinationFormComponent} from "./delivery-destination-form.component";

describe('_page-component/delivery-cycle/c/destination-form', () => {
  let component: DeliveryDestinationFormComponent;
  let fixture: ComponentFixture<DeliveryDestinationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DeliveryCycleModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDestinationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   // expect(component).toBeTruthy()
  // });
});
