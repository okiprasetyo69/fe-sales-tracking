import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

class PermissionData {
  public data: any;
  public error: number;
  public message: string;
}

@Injectable()
export class PermissionService {
  public dataForm = {};
  public dataToggle = {
    ids: [],
  };
  public dataAllToggle = {};

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }


  // datatable mockup
  indexDatatables(payload, module): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      category: 'permission',
      type: 'web',
      job_category: module,
    };

    this.location.replaceState('pages/permission/' + module + '/index/page',
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

  indexDatatablesLog(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      type: 'management',
      category: 'approved',
    };

    this.location.replaceState('pages/permission/sales/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir +
      '&category=' + 'approved');

    return this.apiService
      .get_py(
        '/permission_alert',
        params,
      ).map(data => data);
  }

  set_dataform(data) {
    this.dataForm = data;
  }

  set_datatoggle(data) {
    this.dataToggle = data;
  }

  set_dataAllToggle(data) {
    this.dataAllToggle = data;
  }

  test_request(): Observable<any> {
    return this.apiService.get_ap(`/questions`)
      .map(data => data);
  }

  confirm(id): Observable<any> {
    return this.apiService
      .put_py(
        '/permission_alert/' + id,
        {
          is_approved: 1,
        },
      ).map(data => data);
  }

  cancel(id): Observable<any> {
    return this.apiService
      .put_py(
        '/permission_alert/' + id,
        {
          is_rejected: 1,
        },
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/permission_alert/${id}`)
      .map(data => data);
  }

  oldRoute(id): Observable<any> {
    return this.apiService.get_py(`/visit/plan/${id}`)
      .map(data => data);
  }
}
