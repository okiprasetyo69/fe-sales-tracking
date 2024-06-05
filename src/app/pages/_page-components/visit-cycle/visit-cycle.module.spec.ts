import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {VisitCycleModule} from "./visit-cycle.module";
import {VisitCycleComponent} from "./visit-cycle.component";

describe('_pages-components/visit-cycle/component', () => {
  let component: VisitCycleComponent;
  let fixture: ComponentFixture<VisitCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VisitCycleModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
