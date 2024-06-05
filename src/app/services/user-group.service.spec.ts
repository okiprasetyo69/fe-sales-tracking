import {TestBed, inject} from '@angular/core/testing';

import {UserGroupService} from './user-group.service';
import {AppModule} from "../app.module";


describe('services/user-group', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [UserGroupService],
    });
  });

  it('should be created', inject([UserGroupService], (service: UserGroupService) => {
    expect(service).toBeTruthy();
  }));
});
