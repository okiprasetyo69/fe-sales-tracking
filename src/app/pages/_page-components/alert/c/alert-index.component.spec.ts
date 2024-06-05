import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {AlertModule} from "../alert.module";
import {AlertIndexComponent} from "./alert-index.component";

describe('_page-component/alert/c/index', () => {
  let component: AlertIndexComponent;
  let fixture: ComponentFixture<AlertIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AlertModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
