import {TestBed, inject} from '@angular/core/testing';

import {OauthService} from './oauth.service';
import {AppModule} from "../app.module";


describe('services/oauth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
  });

  it('should be created', inject([OauthService], (service: OauthService) => {
    expect(service).toBeTruthy();
  }));
});
