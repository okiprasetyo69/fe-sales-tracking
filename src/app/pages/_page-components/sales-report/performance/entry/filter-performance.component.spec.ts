import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPerformanceComponent } from './filter-performance.component';

describe('FilterPerformanceComponent', () => {
  let component: FilterPerformanceComponent;
  let fixture: ComponentFixture<FilterPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
