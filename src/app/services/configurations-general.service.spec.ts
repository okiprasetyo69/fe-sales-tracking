import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {ConfigurationsGeneralService} from "./configurations-general.service";


describe('services/configurations-general', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [ConfigurationsGeneralService
      ],
    });
  });

  it('should be created', inject([ConfigurationsGeneralService], (service: ConfigurationsGeneralService) => {
    expect(service).toBeTruthy();
  }));
});
