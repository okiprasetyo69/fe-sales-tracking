import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {SalesOrderModule} from "../sales-order.module";
import {SalesOrderImportComponent} from "./sales-order-import.component";

describe('_pages-components/sales-order/c/import', () => {
  let component: SalesOrderImportComponent;
  let fixture: ComponentFixture<SalesOrderImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SalesOrderModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
