import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {SalesOrderModule} from "../sales-order.module";
import {SalesOrderIndexComponent} from "./sales-order-index.component";

describe('_pages-components/sales-order/c/index', () => {
  let component: SalesOrderIndexComponent;
  let fixture: ComponentFixture<SalesOrderIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SalesOrderModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
