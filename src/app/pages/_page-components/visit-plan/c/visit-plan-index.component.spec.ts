import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {VisitPlanModule} from "../visit-plan.module";
import {VisitPlanIndexComponent} from "./visit-plan-index.component";

describe('_pages-components/visit-plan/c/index', () => {
  let component: VisitPlanIndexComponent
  let fixture: ComponentFixture<VisitPlanIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VisitPlanModule, RouterTestingModule],
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
