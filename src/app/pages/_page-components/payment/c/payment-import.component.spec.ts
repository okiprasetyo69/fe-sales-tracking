import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PaymentModule} from "../payment.module"
import {PaymentImportComponent} from "./payment-import.component";

describe('_pages-components/payment/c/import', () => {
  let component: PaymentImportComponent;
  let fixture: ComponentFixture<PaymentImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PaymentModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
