import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVisitShowComponent } from './customer-visit-show.component';

describe('CustomerVisitShowComponent', () => {
  let component: CustomerVisitShowComponent;
  let fixture: ComponentFixture<CustomerVisitShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerVisitShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerVisitShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
