import {TestBed, inject} from '@angular/core/testing';

import {MenuService} from './menu.service';
import {AppModule} from "../app.module";


describe('services/menu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
  });

  it('should be created', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));
});
