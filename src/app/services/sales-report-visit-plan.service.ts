import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { dropdown_limit } from '../configs/configs';
import {Pagination} from "@Model/response-pagination";
import {DefaultResponse} from "@Model/response-default";
import {VisitPlanModel, VisitPlanReport} from "@Model/response-plan";

@Injectable()
export class SalesReportVisitPlanService {

  private dataParams = new BehaviorSubject({});
  globalParams = this.dataParams.asObservable();

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  private paramsFilter(payload, dataFormFilter: FormGroup) {
    const date_start = dataFormFilter.controls['date_start'].value;
    const date_end = dataFormFilter.controls['date_end'].value;
    const data_filter_by = dataFormFilter.controls['data_filter_by'].value;
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

    this.dataParams.next(params);
    if (data_filter_by == 2) {
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


  indexDatatables(payload, dataFormFilter: FormGroup): Observable<DefaultResponse<Pagination<VisitPlanReport>>> {
    const paramsExtra = this.paramsFilter(payload, dataFormFilter); 

    this.location.replaceState('pages/sales/report_visit_plan/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService.get_py('/activity/report/sales', paramsExtra).map(data => data);
  }

  // custom collector
  indexDatatablesCollector(payload, dataFormFilter: FormGroup): Observable<DefaultResponse<Pagination<VisitPlanReport>>> {
    const paramsExtra = this.paramsFilter(payload, dataFormFilter);

    this.location.replaceState('pages/collector/report_visit_plan/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService.get_py('/activity/report/collector', paramsExtra).map(data => data);
  }
  // 

  exportExcel(payload, dataFormFilter: FormGroup): Observable<any> {
    const paramsExtra = this.paramsFilter(payload, dataFormFilter);
    return this.apiService.exportExcel('/activity/report/sales/export', paramsExtra).map(data => data);
  }

  exportExcelCollector(payload, dataFormFilter: FormGroup): Observable<any> {
    const paramsExtra = this.paramsFilter(payload, dataFormFilter);
    return this.apiService.exportExcel('/activity/report/collector/export', paramsExtra).map(data => data);
  }

  exportPdf(payload, dataFormFilter: FormGroup): Observable<any> {
    const paramsExtra = this.paramsFilter(payload, dataFormFilter);
    return this.apiService.exportExcel('/activity/report/sales/export/pdf', paramsExtra).map(data => data);
  }

  exportPdfCollector(payload, dataFormFilter: FormGroup): Observable<any> {
    const paramsExtra = this.paramsFilter(payload, dataFormFilter);
    return this.apiService.exportExcel('/activity/report/collector/export/pdf', paramsExtra).map(data => data);
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

  dropdownUserCollector() {
    const params = {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'create_date',
      order_direction: 'desc',
    };
    return this.apiService
      .get_py('/user/collector',
        params,
      ).map(data => data);
  }
}
