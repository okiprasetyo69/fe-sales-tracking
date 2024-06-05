import { TestBed, inject } from '@angular/core/testing';
import { VisitCollectPlanService } from './visitcollect-plan.service';
import { AppModule } from '../app.module';


describe('services/visitcollect-plan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [VisitCollectPlanService],
    });
  });

  it('should be created', inject([VisitCollectPlanService], (service: VisitCollectPlanService) => {
    expect(service).toBeTruthy();
  }));
});
