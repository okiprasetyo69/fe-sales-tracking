import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {RequestOrderModule} from "../request-order.module";
import {RequestOrderShowComponent} from "./request-order-show.component";

describe('_pages-components/request-order/c/show', () => {
  let component: RequestOrderShowComponent;
  let fixture: ComponentFixture<RequestOrderShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RequestOrderModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOrderShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
