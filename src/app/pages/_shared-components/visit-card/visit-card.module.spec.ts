import { VisitCardModule } from './visit-card.module';

describe('VisitCardModule', () => {
  let visitCardModule: VisitCardModule;

  beforeEach(() => {
    visitCardModule = new VisitCardModule();
  });

  it('should create an instance', () => {
    expect(visitCardModule).toBeTruthy();
  });
});
