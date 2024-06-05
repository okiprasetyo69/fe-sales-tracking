import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {LogisticDashboardModule} from "../logistic-dashboard.module";
import {LogisticDashboardIndexComponent} from "./logistic-dashboard-index.component";

describe('_pages-components/logistic-dashboard/c/index', () => {
  let component: LogisticDashboardIndexComponent;
  let fixture: ComponentFixture<LogisticDashboardIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LogisticDashboardModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticDashboardIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
