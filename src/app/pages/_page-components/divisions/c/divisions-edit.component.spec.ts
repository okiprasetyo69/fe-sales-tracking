import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {DivisionsModule} from "../divisions.module";
import {DivisionsEditComponent} from "./divisions-edit.component";

describe('_pages-components/divisions/c/edit', () => {
  let component: DivisionsEditComponent;
  let fixture: ComponentFixture<DivisionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DivisionsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
