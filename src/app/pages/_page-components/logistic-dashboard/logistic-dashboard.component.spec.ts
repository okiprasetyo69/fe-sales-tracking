import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {LogisticDashboardModule} from "./logistic-dashboard.module";
import {LogisticDashboardComponent} from "./logistic-dashboard.component";

describe('_pages-components/logistic-dashboard/component', () => {
  let component: LogisticDashboardComponent;
  let fixture: ComponentFixture<LogisticDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LogisticDashboardModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
