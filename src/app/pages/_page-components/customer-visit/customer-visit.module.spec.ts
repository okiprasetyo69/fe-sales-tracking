import { CustomerVisitModule } from './customer-visit.module';

describe('CustomerVisitModule', () => {
  let customerVisitModule: CustomerVisitModule;

  beforeEach(() => {
    customerVisitModule = new CustomerVisitModule();
  });

  it('should create an instance', () => {
    expect(customerVisitModule).toBeTruthy();
  });
});
