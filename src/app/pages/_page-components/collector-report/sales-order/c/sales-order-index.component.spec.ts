import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderIndexComponent } from './sales-order-index.component';

describe('SalesOrderIndexComponent', () => {
  let component: SalesOrderIndexComponent;
  let fixture: ComponentFixture<SalesOrderIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
