import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';

@Injectable()
export class LogisticDashboardService {

  constructor(
    private apiService: ApiService,
  ) {
  }

  delivery(): Observable<any> {
    const params = {
      start_date: '2018-01-01',
      end_date: '2018-08-24',
    };
    return this.apiService.get_py(`/statistic/logistic/delivery`).map(data => data);
  }

  report(): Observable<any> {
    const params = {
      start_date: '2018-01-01',
      end_date: '2018-08-24',
    };
    return this.apiService.get_py(`/statistic/logistic/report`).map(data => data);
  }

  packing_slip(): Observable<any> {
    const params = {
      start_date: '2018-01-01',
      end_date: '2018-08-24',
    };
    return this.apiService.get_py(`/statistic/logistic/packing_slip`).map(data => data);
  }

  // With Filter

  delivery_with_filter(dataFormFilter: FormGroup): Observable<any> {
    const params = {
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value,
    };
    return this.apiService.get_py(`/statistic/logistic/delivery`, params).map(data => data);
  }

  report_with_filter(dataFormFilter: FormGroup): Observable<any> {
    const params = {
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value,
    };
    return this.apiService.get_py(`/statistic/logistic/report`, params).map(data => data);
  }

  packing_slip_with_filter(dataFormFilter: FormGroup): Observable<any> {
    const params = {
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value,
    };
    return this.apiService.get_py(`/statistic/logistic/packing_slip`, params).map(data => data);
  }

}
