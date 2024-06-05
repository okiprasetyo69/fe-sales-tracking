import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {VisitCycleModule} from "../visit-cycle.module";
import {VisitCycleEditComponent} from "./visit-cycle-edit.component";

describe('_pages-components/visit-cycle/c/edit', () => {
  let component: VisitCycleEditComponent;
  let fixture: ComponentFixture<VisitCycleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VisitCycleModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitCycleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
