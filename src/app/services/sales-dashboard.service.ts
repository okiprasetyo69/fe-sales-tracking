import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';

@Injectable()
export class SalesDashboardService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  planDonut(): Observable<any> {
    const params = {
      start_date: '2018-01-01',
      end_date: '2018-08-24',
    };
    return this.apiService.get_py(`/statistic/sales/visit`).map(data => data);
  }

  invoiceDonut(): Observable<any> {
    return this.apiService.get_py(`/statistic/sales/invoice`).map(data => data);
  }

  activities(): Observable<any> {
    return this.apiService.get_py(`/statistic/sales/activities`).map(data => data);
  }

  permission_alert(): Observable<any> {
    return this.apiService.get_py(`/statistic/sales/permission_alert`).map(data => data);
  }

  report(): Observable<any> {
    return this.apiService.get_py(`/statistic/sales/report`).map(data => data);
  }

  orders(): Observable<any> {
    return this.apiService.get_py(`/statistic/sales/orders`).map(data => data);
  }

  // With Filter

  planDonut_with_filter(dataFormFilter: FormGroup): Observable<any> {
    const params = {
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value,
    };
    return this.apiService.get_py(`/statistic/sales/visit`, params).map(data => data);
  }

  invoiceDonut_with_filter(dataFormFilter: FormGroup): Observable<any> {
    const params = {
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value,
    };
    return this.apiService.get_py(`/statistic/sales/invoice`, params).map(data => data);
  }

  // custom
  collectDonut_with_filter(dataFormFilter: FormGroup): Observable<any> {
    const params = {
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value,
    };
    return this.apiService.get_py(`/statistic/collector/visit`, params).map(data => data);
  }

  // categoryVisitPie_with_filter(dataFormFilter: FormGroup): Observable<any>{
  //   const params = {
  //     start_date: dataFormFilter.controls['date_start'].value,
  //     end_date: dataFormFilter.controls['date_end'].value,
  //   };
  //   return this.apiService.get_py(`/statistic/collector/visit`, params).map(data => data);
  // }
  // custom end
  
  activities_with_filter(dataFormFilter: FormGroup): Observable<any> {
    const params = {
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value,
    };
    return this.apiService.get_py(`/statistic/sales/activities`, params).map(data => data);
  }

  permission_alert_with_filter(dataFormFilter: FormGroup): Observable<any> {
    const params = {
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value,
    };
    return this.apiService.get_py(`/statistic/sales/permission_alert`, params).map(data => data);
  }

  report_with_filter(dataFormFilter: FormGroup): Observable<any> {
    const params = {
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value,
    };
    return this.apiService.get_py(`/statistic/sales/report`, params).map(data => data);
  }


  orders_with_filter(dataFormFilter: FormGroup): Observable<any> {
    const params = {
      start_date: dataFormFilter.controls['date_start'].value,
      end_date: dataFormFilter.controls['date_end'].value,
    };
    return this.apiService.get_py(`/statistic/sales/orders`, params).map(data => data);
  }
}
