import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {SalesOrderModule} from "../sales-order.module";
import {SalesOrderShowComponent} from "./sales-order-show.component";

describe('_pages-components/sales-order/c/show', () => {
  let component: SalesOrderShowComponent;
  let fixture: ComponentFixture<SalesOrderShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SalesOrderModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
