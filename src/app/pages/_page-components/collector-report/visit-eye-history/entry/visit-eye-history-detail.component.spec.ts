import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitEyeHistoryDetailComponent } from './visit-eye-history-detail.component';

describe('VisitEyeHistoryDetailComponent', () => {
  let component: VisitEyeHistoryDetailComponent;
  let fixture: ComponentFixture<VisitEyeHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitEyeHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitEyeHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
