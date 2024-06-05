import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {VisitCycleModule} from "../visit-cycle.module";
import {VisitCycleIndexComponent} from "./visit-cycle-index.component";

describe('_pages-components/visit-cycle/c/index', () => {
  let component: VisitCycleIndexComponent;
  let fixture: ComponentFixture<VisitCycleIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VisitCycleModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitCycleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
