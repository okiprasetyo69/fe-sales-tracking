import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CollectPlanModule} from "../collect-plan.module";
import {CollectPlanEditComponent} from "./collect-plan-edit.component";

describe('_pages-components/collect-plan/c/edit', () => {
  let component: CollectPlanEditComponent
  let fixture: ComponentFixture<CollectPlanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CollectPlanModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
