import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CollectorComponent} from "./collector.component";
import {CollectorModule} from "./collector.module";

describe('app/pages/collector', () => {
  let component: CollectorComponent;
  let fixture: ComponentFixture<CollectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CollectorModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
