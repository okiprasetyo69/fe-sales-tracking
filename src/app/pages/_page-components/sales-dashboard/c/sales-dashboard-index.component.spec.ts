import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {SalesDashboardModule} from "../sales-dashboard.module";
import {SalesDashboardIndexComponent} from "./sales-dashboard-index.component";

describe('_pages-components/sales-dashboard/c/index', () => {
  let component: SalesDashboardIndexComponent;
  let fixture: ComponentFixture<SalesDashboardIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SalesDashboardModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDashboardIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
