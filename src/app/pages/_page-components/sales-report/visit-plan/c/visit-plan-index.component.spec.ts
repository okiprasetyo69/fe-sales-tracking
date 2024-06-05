import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPlanIndexComponent } from './visit-plan-index.component';

describe('VisitPlanIndexComponent', () => {
  let component: VisitPlanIndexComponent;
  let fixture: ComponentFixture<VisitPlanIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitPlanIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPlanIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
