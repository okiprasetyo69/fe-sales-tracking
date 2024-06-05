import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {LivemapModule} from "./livemap.module";
import {LivemapComponent} from "./livemap.component";

describe('_pages-components/livemap/component', () => {
  let component: LivemapComponent;
  let fixture: ComponentFixture<LivemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LivemapModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
