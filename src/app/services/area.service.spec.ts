import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {AreaService} from "./area.service";


describe('services/area', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AreaService],
    });
  });

  it('should be created', inject([AreaService], (service: AreaService) => {
    expect(service).toBeTruthy();
  }));
});
