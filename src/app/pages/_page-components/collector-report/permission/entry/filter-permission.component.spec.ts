import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPermissionComponent } from './filter-permission.component';

describe('FilterPermissionComponent', () => {
  let component: FilterPermissionComponent;
  let fixture: ComponentFixture<FilterPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
