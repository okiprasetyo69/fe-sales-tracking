import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {EmployeeModule} from "../employee.module";
import {EmployeeIndexComponent} from "./employee-index.component";

describe('_pages-components/employee/c/index', () => {
  let component: EmployeeIndexComponent;
  let fixture: ComponentFixture<EmployeeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
