import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { dropdown_limit } from '../configs/configs';
import { Form, FormGroup } from '@angular/forms';

@Injectable()
export class SalesReportPerformanceService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  private paramsFilter(payload, dataFormFilter: FormGroup) {
    const date_start = dataFormFilter.controls['date_start'].value;
    const date_end = dataFormFilter.controls['date_end'].value;
    const user_id = dataFormFilter.controls['user_id'].value;
    const branch_id = dataFormFilter.controls['branch_id'].value;
    const division_id = dataFormFilter.controls['division_id'].value;
    const username = dataFormFilter.controls['username'].value;
    let paramsExtra = {};
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      type: 'web',
    };

    if ((date_start != null && date_start != '') && (date_end != null && date_end != '')) {
      paramsExtra = params;
      Object.assign(paramsExtra, {
        page_filter: JSON.stringify(
          [{
            start_date: date_start,
            end_date: date_end,
            user_id: user_id,
            branch_id: branch_id,
            division_id: division_id,
            username: username,
          }]),
      });
    } else {
      paramsExtra = params;
      if (!this.checkArrayIsEmpty(user_id) || !this.checkArrayIsEmpty(branch_id) || !this.checkArrayIsEmpty(division_id)) {
        Object.assign(paramsExtra, {
          page_filter: JSON.stringify([{
            start_date: '',
            end_date: '',
            user_id: user_id,
            branch_id: branch_id,
            division_id: division_id,
            username: username,
          }]),
        });
      }
    }
    return paramsExtra;
  }

  private checkArrayIsEmpty(data) {
    if (data == null) {
      return true;
    } else {
      if (data.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  indexDatatables(payload, dataFormFilter: FormGroup): Observable<any> {
    const params = this.paramsFilter(payload, dataFormFilter);


    this.location.replaceState('pages/sales/report_performance/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService.get_py(
      '/user/sales',
      params,
    ).map(data => data);
  }

  performance(payload: string, data_filter: FormGroup): Observable<any> {
    const params = {
      user_id: payload,
      start_date: data_filter.controls['date_start'].value,
      end_date: data_filter.controls['date_end'].value,
    };

    return this.apiService.get_py(
      '/statistic/sales/performance',
      params,
    ).map(data => data);
  }

  performanceChart(payload: any): Observable<any> {
    let uid: string;
    uid = payload.user_id;
    const params = {
      user_id: '[' + uid + ']',
      start_date: payload.date_start,
      end_date: payload.date_end
    };

    console.info("params : ", params);

    return this.apiService.get_py(
      '/statistic/sales/performance_chart',
      params,
    ).map(data => data);
  }

  dropdownUser() {
    const params = {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'create_date',
      order_direction: 'desc',
    };
    return this.apiService
      .get_py('/user/sales',
        params,
      ).map(data => data);
  }
}
