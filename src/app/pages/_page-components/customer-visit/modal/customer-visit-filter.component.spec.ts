import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVisitFilterComponent } from './customer-visit-filter.component';

describe('CustomerVisitFilterComponent', () => {
  let component: CustomerVisitFilterComponent;
  let fixture: ComponentFixture<CustomerVisitFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerVisitFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerVisitFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
