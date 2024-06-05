import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {UserGroupsModule} from "../user-groups.module";
import {UserGroupsEditComponent} from "./user-groups-edit.component";

describe('_pages-components/user-groups/c/edit', () => {
  let component: UserGroupsEditComponent;
  let fixture: ComponentFixture<UserGroupsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UserGroupsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
