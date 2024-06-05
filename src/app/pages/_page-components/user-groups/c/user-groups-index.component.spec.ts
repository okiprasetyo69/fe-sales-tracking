import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {UserGroupsModule} from "../user-groups.module";
import {UserGroupsIndexComponent} from "./user-groups-index.component";

describe('_pages-components/user-groups/c/index', () => {
  let component: UserGroupsIndexComponent;
  let fixture: ComponentFixture<UserGroupsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UserGroupsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
