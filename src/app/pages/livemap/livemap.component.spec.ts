import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LivemapComponent} from './livemap.component';
import {LivemapModule} from "./livemap.module";
import {RouterTestingModule} from "@angular/router/testing";

describe('app/pages/livemap', () => {
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
