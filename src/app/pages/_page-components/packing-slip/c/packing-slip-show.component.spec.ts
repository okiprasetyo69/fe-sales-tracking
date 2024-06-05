import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PackingSlipModule} from "../packing-slip.module";
import {PackingSlipShowComponent} from "./packing-slip-show.component";

describe('_pages-components/packing-slip/c/index', () => {
  let component: PackingSlipShowComponent;
  let fixture: ComponentFixture<PackingSlipShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PackingSlipModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingSlipShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
