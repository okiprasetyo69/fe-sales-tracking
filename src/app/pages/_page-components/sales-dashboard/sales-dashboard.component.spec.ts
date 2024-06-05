import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {SalesDashboardModule} from "./sales-dashboard.module";
import {SalesDashboardComponent} from "./sales-dashboard.component";

describe('_pages-components/sales-dashboard/component', () => {
  let component: SalesDashboardComponent;
  let fixture: ComponentFixture<SalesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SalesDashboardModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
