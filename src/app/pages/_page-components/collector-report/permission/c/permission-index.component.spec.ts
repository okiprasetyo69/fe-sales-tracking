import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {PermissionModule} from '../permission.module';
import {PermissionIndexComponent} from './permission-index.component';

describe('_pages-components/permission/c/index', () => {
  let component: PermissionIndexComponent;
  let fixture: ComponentFixture<PermissionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PermissionModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
