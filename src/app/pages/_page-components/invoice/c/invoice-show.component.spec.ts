import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {InvoiceModule} from "../invoice.module";
import {InvoiceShowComponent} from "./invoice-show.component";

describe('_pages-components/invoice/c/show', () => {
  let component: InvoiceShowComponent;
  let fixture: ComponentFixture<InvoiceShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [InvoiceModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
