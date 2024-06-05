import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSalesOrderComponent } from './filter-sales-order.component';

describe('FilterSalesOrderComponent', () => {
  let component: FilterSalesOrderComponent;
  let fixture: ComponentFixture<FilterSalesOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSalesOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
