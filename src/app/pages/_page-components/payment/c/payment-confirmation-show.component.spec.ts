import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PaymentModule} from "../payment.module";
import {PaymentConfirmationShowComponent} from "./payment-confirmation-show.component";

describe('_pages-components/payment/c/confirmation-show', () => {
  let component: PaymentConfirmationShowComponent;
  let fixture: ComponentFixture<PaymentConfirmationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PaymentModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentConfirmationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
