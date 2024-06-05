import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitEyeHistoryIndexComponent } from './visit-eye-history-index.component';

describe('VisitEyeHistoryIndexComponent', () => {
  let component: VisitEyeHistoryIndexComponent;
  let fixture: ComponentFixture<VisitEyeHistoryIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitEyeHistoryIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitEyeHistoryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
