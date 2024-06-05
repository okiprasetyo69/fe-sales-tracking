import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse } from '@Model/response-default';
import { Pagination, PaginationSingle } from '@Model/response-pagination';
import { CustomerVisitDelivery } from '@Model/response-customer';
import { ApiService } from './api.service';
import { FormGroup } from '@angular/forms';
import { Area } from '@Model/response-area';

declare var moment: any;

@Injectable({
  providedIn: 'root',
})
export class CustomerVisitService {

  constructor(private apiService: ApiService) {
  }

  getVisit(dataFormFilter: FormGroup): Observable<DefaultResponse<PaginationSingle<CustomerVisitDelivery>>> {
    const dateStart = moment(dataFormFilter.controls['date_start'].value).format('YYYY-MM-DD');
    const dateEnd = moment(dataFormFilter.controls['date_end'].value).format('YYYY-MM-DD');
    const area = dataFormFilter.controls['area'].value.join(',');
    const user_id = dataFormFilter.controls['user_id'].value;
    const request = {
      area: '['.concat(area).concat(']'),
      start_date: dateStart,
      end_date: dateEnd,
      user_id: (user_id == null) ? '' : user_id.toString(),
    };
    return this.apiService.get_py(`/customer/sales/report?page_filter=[${JSON.stringify(request)}]`).map(data => data);
  }

  // custom collector
  getVisitCollector(dataFormFilter: FormGroup): Observable<DefaultResponse<PaginationSingle<CustomerVisitDelivery>>> {
    const dateStart = moment(dataFormFilter.controls['date_start'].value).format('YYYY-MM-DD');
    const dateEnd = moment(dataFormFilter.controls['date_end'].value).format('YYYY-MM-DD');
    const area = dataFormFilter.controls['area'].value.join(',');
    const user_id = dataFormFilter.controls['user_id'].value;
    const request = {
      area: '['.concat(area).concat(']'),
      start_date: dateStart,
      end_date: dateEnd,
      user_id: (user_id == null) ? '' : user_id.toString(),
    };
    return this.apiService.get_py(`/customer/collector/report?page_filter=[${JSON.stringify(request)}]`).map(data => data);
  }
  // 

  getDelivery(dataFormFilter: FormGroup): Observable<DefaultResponse<PaginationSingle<CustomerVisitDelivery>>> {
    const dateStart = moment(dataFormFilter.controls['date_start'].value).format('YYYY-MM-DD');
    const dateEnd = moment(dataFormFilter.controls['date_end'].value).format('YYYY-MM-DD');
    const area = dataFormFilter.controls['area'].value.join(',');
    const user_id = dataFormFilter.controls['user_id'].value;
    const request = {
      area: '['.concat(area).concat(']'),
      start_date: dateStart,
      end_date: dateEnd,
      user_id: (user_id == null) ? '' : user_id.toString(),
    };
    return this.apiService.get_py(`/customer/logistik/report?page_filter=[${JSON.stringify(request)}]`).map(data => data);
  }

  getListArea(): Observable<DefaultResponse<Pagination<Area>>> {
    const params = {
      page: 1,
      limit: 1000,
    };

    return this.apiService
      .get_py(
        '/area',
        params,
      ).map(data => data);
  }
}
