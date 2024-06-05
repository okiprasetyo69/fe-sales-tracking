import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {LivemapModule} from "../livemap.module";
import {LivemapIndexComponent} from "./livemap-index.component";

describe('_pages-components/livemap/c/index', () => {
  let component: LivemapIndexComponent;
  let fixture: ComponentFixture<LivemapIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LivemapModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivemapIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
