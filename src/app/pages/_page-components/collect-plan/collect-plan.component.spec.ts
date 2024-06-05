import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CollectPlanModule} from "./collect-plan.module";
import {CollectPlanComponent} from "./collect-plan.component";

describe('_pages-components/collect-plan/component', () => {
  let component: CollectPlanComponent
  let fixture: ComponentFixture<CollectPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CollectPlanModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
