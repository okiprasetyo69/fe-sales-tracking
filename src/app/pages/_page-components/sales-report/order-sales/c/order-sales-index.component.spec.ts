import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSalesIndexComponent } from './order-sales-index.component';

describe('OrderSalesIndexComponent', () => {
  let component: OrderSalesIndexComponent;
  let fixture: ComponentFixture<OrderSalesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSalesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSalesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
