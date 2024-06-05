import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PermissionAlertModule} from "./permission-alert.module";
import {PermissionAlertComponent} from "./permission-alert.component";

describe('_pages-components/permission-alert/component', () => {
  let component: PermissionAlertComponent;
  let fixture: ComponentFixture<PermissionAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PermissionAlertModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
