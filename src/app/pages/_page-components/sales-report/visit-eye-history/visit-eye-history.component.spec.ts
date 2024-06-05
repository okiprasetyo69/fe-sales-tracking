import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitEyeHistoryComponent } from './visit-eye-history.component';

describe('VisitEyeHistoryComponent', () => {
  let component: VisitEyeHistoryComponent;
  let fixture: ComponentFixture<VisitEyeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitEyeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitEyeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
