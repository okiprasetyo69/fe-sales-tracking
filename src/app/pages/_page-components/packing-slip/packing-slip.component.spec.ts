import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PackingSlipModule} from "./packing-slip.module";
import {PackingSlipComponent} from "./packing-slip.component";

describe('_pages-components/packing-slip/component', () => {
  let component: PackingSlipComponent;
  let fixture: ComponentFixture<PackingSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PackingSlipModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
