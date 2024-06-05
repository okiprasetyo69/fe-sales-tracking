import { PlanTimelineModule } from './plan-timeline.module';

describe('PlanTimelineModule', () => {
  let planTimelineModule: PlanTimelineModule;

  beforeEach(() => {
    planTimelineModule = new PlanTimelineModule();
  });

  it('should create an instance', () => {
    expect(planTimelineModule).toBeTruthy();
  });
});
