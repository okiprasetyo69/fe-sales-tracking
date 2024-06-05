import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {VisitPlanModule} from "../visit-plan.module";
import {VisitPlanEditComponent} from "./visit-plan-edit.component";

describe('_pages-components/visit-plan/c/edit', () => {
  let component: VisitPlanEditComponent
  let fixture: ComponentFixture<VisitPlanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VisitPlanModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
