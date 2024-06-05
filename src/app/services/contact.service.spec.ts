import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {ContactService} from "./contact.service";


describe('services/contact', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [ContactService
      ],
    });
  });

  it('should be created', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));
});
