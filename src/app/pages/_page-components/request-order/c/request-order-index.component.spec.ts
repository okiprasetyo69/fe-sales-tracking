import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {RequestOrderModule} from "../request-order.module";
import {RequestOrderIndexComponent} from "./request-order-index.component";

describe('_pages-components/request-order/c/index', () => {
  let component: RequestOrderIndexComponent;
  let fixture: ComponentFixture<RequestOrderIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RequestOrderModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOrderIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
