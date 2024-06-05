import { VisitEyeHistoryModule } from './visit-eye-history.module';

describe('VisitEyeHistoryModule', () => {
  let visitEyeHistoryModule: VisitEyeHistoryModule;

  beforeEach(() => {
    visitEyeHistoryModule = new VisitEyeHistoryModule();
  });

  it('should create an instance', () => {
    expect(visitEyeHistoryModule).toBeTruthy();
  });
});
