import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {SettingNotificationsModule} from "../setting-notifications.module";
import {SettingNotificationsIndexComponent} from "./setting-notifications-index.component";

describe('_pages-components/setting-notifications/c/index', () => {
  let component: SettingNotificationsIndexComponent;
  let fixture: ComponentFixture<SettingNotificationsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SettingNotificationsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingNotificationsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
