import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceIndexComponent } from './performance-index.component';

describe('PerformanceIndexComponent', () => {
  let component: PerformanceIndexComponent;
  let fixture: ComponentFixture<PerformanceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
