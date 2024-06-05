import { IndexTableModule } from './index-table.module';

describe('IndexTableModule', () => {
  let indexTableModule: IndexTableModule;

  beforeEach(() => {
    indexTableModule = new IndexTableModule();
  });

  it('should create an instance', () => {
    expect(indexTableModule).toBeTruthy();
  });
});
