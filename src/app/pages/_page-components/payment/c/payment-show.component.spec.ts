import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PaymentModule} from "../payment.module"
import {PaymentShowComponent} from "./payment-show.component";

describe('_pages-components/payment/c/show', () => {
  let component: PaymentShowComponent;
  let fixture: ComponentFixture<PaymentShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PaymentModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
