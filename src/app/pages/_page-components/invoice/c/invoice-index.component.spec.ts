import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {InvoiceModule} from "../invoice.module";
import {InvoiceIndexComponent} from "./invoice-index.component";

describe('_pages-components/invoice/c/index', () => {
  let component: InvoiceIndexComponent;
  let fixture: ComponentFixture<InvoiceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [InvoiceModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
