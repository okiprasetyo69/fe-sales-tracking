import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTimelineComponent } from './plan-timeline.component';

describe('PlanTimelineComponent', () => {
  let component: PlanTimelineComponent;
  let fixture: ComponentFixture<PlanTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
