import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOrderSalesComponent } from './filter-order-sales.component';

describe('FilterOrderSalesComponent', () => {
  let component: FilterOrderSalesComponent;
  let fixture: ComponentFixture<FilterOrderSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterOrderSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterOrderSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
