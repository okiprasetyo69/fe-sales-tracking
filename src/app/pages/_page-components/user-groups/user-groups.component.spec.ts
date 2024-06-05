import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {UserGroupsModule} from "./user-groups.module";
import {UserGroupsComponent} from "./user-groups.component";

describe('_pages-components/user-groups/component', () => {
  let component: UserGroupsComponent;
  let fixture: ComponentFixture<UserGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UserGroupsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
