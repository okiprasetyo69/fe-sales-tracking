import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {SettingNotificationsModule} from "./setting-notifications.module";
import {SettingNotificationsComponent} from "./setting-notifications.component";

describe('_pages-components/setting-notifications/component', () => {
  let component: SettingNotificationsComponent;
  let fixture: ComponentFixture<SettingNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SettingNotificationsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
