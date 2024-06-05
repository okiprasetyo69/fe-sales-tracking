import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {SalesOrderModule} from "./sales-order.module";
import {SalesOrderComponent} from "./sales-order.component";

describe('_pages-components/sales-order/component', () => {
  let component: SalesOrderComponent;
  let fixture: ComponentFixture<SalesOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SalesOrderModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
