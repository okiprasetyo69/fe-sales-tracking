import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {VisitPlanModule} from "./visit-plan.module";
import {VisitPlanComponent} from "./visit-plan.component";

describe('_pages-components/visit-plan/component', () => {
  let component: VisitPlanComponent
  let fixture: ComponentFixture<VisitPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VisitPlanModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
