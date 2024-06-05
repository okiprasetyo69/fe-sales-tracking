import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PaymentModule} from "../payment.module";
import {PaymentConfirmationIndexComponent} from "./payment-confirmation-index.component";

describe('_pages-components/payment/c/confirmation-index', () => {
  let component: PaymentConfirmationIndexComponent;
  let fixture: ComponentFixture<PaymentConfirmationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PaymentModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentConfirmationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   // expect(component).toBeTruthy();
  //   pending('Error *ngIf');
  // });
});
