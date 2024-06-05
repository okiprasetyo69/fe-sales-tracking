import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CollectorDashboardModule} from "../collector-dashboard.module";
import {CollectorDashboardIndexComponent} from "./collector-dashboard-index.component";

describe('_pages-components/collector-dashboard/c/index', () => {
  let component: CollectorDashboardIndexComponent;
  let fixture: ComponentFixture<CollectorDashboardIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CollectorDashboardModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorDashboardIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
