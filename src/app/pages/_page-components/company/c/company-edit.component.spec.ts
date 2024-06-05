import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CompanyModule} from "../company.module";
import {CompanyEditComponent} from "./company-edit.component";

describe('_page-component/company/c/edit', () => {
  let component: CompanyEditComponent;
  let fixture: ComponentFixture<CompanyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CompanyModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});
