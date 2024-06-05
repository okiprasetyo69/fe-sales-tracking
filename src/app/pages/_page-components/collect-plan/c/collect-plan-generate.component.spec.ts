import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CollectPlanModule} from "../collect-plan.module";
import {CollectPlanGenerateComponent} from "./collect-plan-generate.component";

describe('_pages-components/collect-plan/c/generate', () => {
  let component: CollectPlanGenerateComponent
  let fixture: ComponentFixture<CollectPlanGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CollectPlanModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPlanGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
