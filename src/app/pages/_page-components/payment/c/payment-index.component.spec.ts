import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PaymentModule} from "../payment.module"
import {PaymentIndexComponent} from "./payment-index.component";

describe('_pages-components/payment/c/index', () => {
  let component: PaymentIndexComponent;
  let fixture: ComponentFixture<PaymentIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PaymentModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
