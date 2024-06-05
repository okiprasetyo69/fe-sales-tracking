import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PermissionAlertModule} from "../permission-alert.module";
import {PermissionAlertIndexComponent} from "./permission-alert-index.component";

describe('_pages-components/permission-alert/c/index', () => {
  let component: PermissionAlertIndexComponent;
  let fixture: ComponentFixture<PermissionAlertIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PermissionAlertModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionAlertIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
