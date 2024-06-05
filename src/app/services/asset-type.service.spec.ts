import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {AssetTypeService} from "./asset-type.service";


describe('services/asset-type', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AssetTypeService],
    });
  });

  it('should be created', inject([AssetTypeService], (service: AssetTypeService) => {
    expect(service).toBeTruthy();
  }));
});
