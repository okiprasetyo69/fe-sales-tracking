import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {VisitPlanModule} from "../visit-plan.module";
import {VisitPlanGenerateComponent} from "./visit-plan-generate.component";

describe('_pages-components/visit-plan/c/generate', () => {
  let component: VisitPlanGenerateComponent
  let fixture: ComponentFixture<VisitPlanGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VisitPlanModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPlanGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
