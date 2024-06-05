import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PackingSlipModule} from "../packing-slip.module";
import {PackingSlipIndexComponent} from "./packing-slip-index.component";

describe('_pages-components/packing-slip/c/index', () => {
  let component: PackingSlipIndexComponent;
  let fixture: ComponentFixture<PackingSlipIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PackingSlipModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingSlipIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
