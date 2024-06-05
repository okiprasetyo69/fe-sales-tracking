import { TestBed, inject } from '@angular/core/testing';
import { VisitPlanService } from './visit-plan.service';
import { AppModule } from '../app.module';


describe('services/visit-plan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [VisitPlanService],
    });
  });

  it('should be created', inject([VisitPlanService], (service: VisitPlanService) => {
    expect(service).toBeTruthy();
  }));
});
