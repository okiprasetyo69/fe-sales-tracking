import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {DivisionsModule} from "./divisions.module";
import {DivisionsComponent} from "./divisions.component";

describe('_pages-components/divisions/component', () => {
  let component: DivisionsComponent;
  let fixture: ComponentFixture<DivisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DivisionsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
