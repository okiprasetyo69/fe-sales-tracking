import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CustomersModule} from "../customers.module";
import {CustomersIndexComponent} from "./customers-index.component";

describe('_page-component/customers/c/index', () => {
  let component: CustomersIndexComponent;
  let fixture: ComponentFixture<CustomersIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomersModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});
