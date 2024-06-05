import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CompanyModule} from "../company.module";
import {CompanyShowComponent} from "./company-show.component";

describe('_page-component/company/c/show', () => {
  let component: CompanyShowComponent;
  let fixture: ComponentFixture<CompanyShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CompanyModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy()
  });
});
