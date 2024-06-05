import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorPageComponent} from './error-page.component';
import {ErrorPageModule} from "./error-page.module";
import {RouterTestingModule} from "@angular/router/testing";

describe('app/pages/error-page', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ErrorPageModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
