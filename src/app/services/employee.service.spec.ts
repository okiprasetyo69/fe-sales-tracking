import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {EmployeeService} from "./employee.service";


describe('services/employee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [EmployeeService],
    });
  });

  it('should be created', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
