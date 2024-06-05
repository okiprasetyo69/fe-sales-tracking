import {TestBed, inject} from '@angular/core/testing';

import {UserService} from './user.service';
import {AppModule} from "../app.module";


describe('services/user', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [UserService],
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
