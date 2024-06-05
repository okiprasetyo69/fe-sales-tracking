import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CollectPlanModule} from "../collect-plan.module";
import {CollectPlanIndexComponent} from "./collect-plan-index.component";

describe('_pages-components/collect-plan/c/index', () => {
  let component: CollectPlanIndexComponent
  let fixture: ComponentFixture<CollectPlanIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CollectPlanModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPlanIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
