import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CustomersModule} from "../customers.module";
import {CustomersImportComponent} from "./customers-import.component";

describe('_page-component/customers/c/import', () => {
  let component: CustomersImportComponent;
  let fixture: ComponentFixture<CustomersImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomersModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});
