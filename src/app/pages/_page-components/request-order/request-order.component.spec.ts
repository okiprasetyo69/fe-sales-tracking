import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {RequestOrderModule} from "./request-order.module";
import {RequestOrderComponent} from "./request-order.component";

describe('_pages-components/request-order/component', () => {
  let component: RequestOrderComponent;
  let fixture: ComponentFixture<RequestOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RequestOrderModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
