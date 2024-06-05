import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CustomersModule} from "../customers.module";
import {CustomersEditComponent} from "./customers-edit.component";

describe('_page-component/customers/c/edit', () => {
  let component: CustomersEditComponent;
  let fixture: ComponentFixture<CustomersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomersModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});
