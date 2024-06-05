import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {AreaModule} from "../area.module";
import {AreaIndexComponent} from "./area-index.component";

describe('_page-component/area/c/index', () => {
  let component: AreaIndexComponent;
  let fixture: ComponentFixture<AreaIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AreaModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
