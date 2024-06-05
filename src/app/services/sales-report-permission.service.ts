import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Injectable()
export class SalesReportPermissionService {
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
      job_category: 'sales',
      category: 'permission',
    };

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

  // custom collector
  private paramsFilterCollector(payload, dataFormFilter: FormGroup) {
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
      job_category: 'collector',
      category: 'permission',
    };

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

  indexDatatables(payload, dataFormFilter: FormGroup): Observable<any> {
    const params = this.paramsFilter(payload, dataFormFilter);
    this.location.replaceState('pages/sales/report_permission/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService.get_py(
      '/permission_alert',
      params,
    ).map(data => data);
  }

  // custom collector
  indexDatatablesCollector(payload, dataFormFilter: FormGroup): Observable<any> {
    const params = this.paramsFilterCollector(payload, dataFormFilter);
    this.location.replaceState('pages/collector/report_permission/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService.get_py(
      '/permission_alert',
      params,
    ).map(data => data);
  }


  exportExcel(payload, dataFormFilter: FormGroup): Observable<any> {
    const paramsExtra = this.paramsFilter(payload, dataFormFilter);
    return this.apiService.exportExcel('/permission_alert/export', paramsExtra).map(data => data);
  }

  exportExcelCollector(payload, dataFormFilter: FormGroup): Observable<any> {
    const paramsExtra = this.paramsFilterCollector(payload, dataFormFilter);
    return this.apiService.exportExcel('/permission_alert/export', paramsExtra).map(data => data);
  }

  exportPdf(payload, dataFormFilter: FormGroup): Observable<any> {
    const paramsExtra = this.paramsFilter(payload, dataFormFilter);
    return this.apiService.exportExcel('/permission_alert/export/pdf', paramsExtra).map(data => data);
  }

  exportPdfCollector(payload, dataFormFilter: FormGroup): Observable<any> {
    const paramsExtra = this.paramsFilter(payload, dataFormFilter);
    return this.apiService.exportExcel('/permission_alert/export/pdf', paramsExtra).map(data => data);
  }
}
