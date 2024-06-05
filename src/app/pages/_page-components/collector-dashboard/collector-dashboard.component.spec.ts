import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CollectorDashboardModule} from "./collector-dashboard.module";
import {CollectorDashboardComponent} from "./collector-dashboard.component";

describe('_pages-components/sales-dashboard/component', () => {
  let component: CollectorDashboardComponent;
  let fixture: ComponentFixture<CollectorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CollectorDashboardModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
