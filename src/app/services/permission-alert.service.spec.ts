import {TestBed, inject} from '@angular/core/testing';

import {PermissionAlertService} from './permission-alert.service';
import {AppModule} from "../app.module";


describe('services/permission-alert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PermissionAlertService],
    });
  });

  it('should be created', inject([PermissionAlertService], (service: PermissionAlertService) => {
    expect(service).toBeTruthy();
  }));
});
