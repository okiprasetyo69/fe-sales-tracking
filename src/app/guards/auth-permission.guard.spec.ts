import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {AuthPermissionGuard} from "./auth-permission.guard";


describe('app/guards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
  });

  it('should be created', inject([AuthPermissionGuard], (service: AuthPermissionGuard) => {
    expect(service).toBeTruthy();
  }));
});
