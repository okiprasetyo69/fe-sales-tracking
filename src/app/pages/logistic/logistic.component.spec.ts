import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {LogisticComponent} from "./logistic.component";
import {LogisticModule} from "./logistic.module";

describe('app/pages/logistic', () => {
  let component: LogisticComponent;
  let fixture: ComponentFixture<LogisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LogisticModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
