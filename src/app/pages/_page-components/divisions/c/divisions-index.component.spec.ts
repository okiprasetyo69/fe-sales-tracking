import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {DivisionsModule} from "../divisions.module";
import {DivisionIndexComponent} from "./divisions-index.component";

describe('_pages-components/divisions/c/index', () => {
  let component: DivisionIndexComponent;
  let fixture: ComponentFixture<DivisionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DivisionsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
