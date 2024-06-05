import {TestBed, inject} from '@angular/core/testing';

import {SettingNotificationsService} from './setting-notifications.service';
import {AppModule} from "../app.module";


describe('services/setting-notifications', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [SettingNotificationsService],
    });
  });

  it('should be created', inject([SettingNotificationsService], (service: SettingNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
