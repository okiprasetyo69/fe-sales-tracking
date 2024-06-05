import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitEyeHistoryFilterComponent } from './visit-eye-history-filter.component';

describe('VisitEyeHistoryFilterComponent', () => {
  let component: VisitEyeHistoryFilterComponent;
  let fixture: ComponentFixture<VisitEyeHistoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitEyeHistoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitEyeHistoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
