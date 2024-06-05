import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {PermissionModule} from "./permission.module";
import {PermissionComponent} from "./permission.component";

describe('_pages-components/permission/component', () => {
  let component: PermissionComponent;
  let fixture: ComponentFixture<PermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PermissionModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
