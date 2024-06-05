import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {AssetService} from "./asset.service";


describe('services/asset', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AssetService],
    });
  });

  it('should be created', inject([AssetService], (service: AssetService) => {
    expect(service).toBeTruthy();
  }));
});
