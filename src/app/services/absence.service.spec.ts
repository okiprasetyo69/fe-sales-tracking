import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from "../app.module";
import { AbsenceService } from './absence.service';
import {AssetTypeService} from "./asset-type.service";

describe('services/absence', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppModule],
        providers: [AbsenceService],
      });
    });
  
    it('should be created', inject([AbsenceService], (service: AbsenceService) => {
      expect(service).toBeTruthy();
    }));
  });
  