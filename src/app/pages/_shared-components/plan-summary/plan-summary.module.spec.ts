import { PlanSummaryModule } from './plan-summary.module';

describe('PlanSummaryModule', () => {
  let planSummaryModule: PlanSummaryModule;

  beforeEach(() => {
    planSummaryModule = new PlanSummaryModule();
  });

  it('should create an instance', () => {
    expect(planSummaryModule).toBeTruthy();
  });
});
