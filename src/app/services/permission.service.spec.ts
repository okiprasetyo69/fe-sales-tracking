import {TestBed, inject} from '@angular/core/testing';

import {PermissionService} from './permission.service';
import {AppModule} from "../app.module";


describe('services/permission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PermissionService],
    });
  });

  it('should be created', inject([PermissionService], (service: PermissionService) => {
    expect(service).toBeTruthy();
  }));
});
