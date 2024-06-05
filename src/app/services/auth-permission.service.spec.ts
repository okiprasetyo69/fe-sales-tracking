import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {AuthPermissionService} from "./auth-permission.service";


describe('services/aut-permission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
  });

  it('should be created', inject([AuthPermissionService], (service: AuthPermissionService) => {
    expect(service).toBeTruthy();
  }));
});
