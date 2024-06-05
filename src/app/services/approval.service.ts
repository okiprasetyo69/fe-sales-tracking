import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { ApiService } from './api.service';
import { ResponseApproval } from '@Model/response-approval';
import { DefaultResponse } from '@Model/response-default';

@Injectable()
export class ApprovalService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  indexApprovalBranch(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      // type: 'web',
    };

    this.location.replaceState('pages/approval/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir +
      '&type=' + 'web');

    return this.apiService
      .get_py(
        '/branches/approval',
        params,
      ).map(data => data);
  }

  getApprovalCounter(): Observable<any> {
    return this.apiService
      .get_py(
        '/approval/notif/checker',
      ).map(data => data);
  }

  indexDatatables(payload, module, prefix): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };

    this.location.replaceState('pages/approval/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir +
      '&module=' + module);

    console.info(prefix + '/approval');
    return this.apiService
      .get_py(
        '/' + prefix + '/approval',
        params,
      ).map(data => data);
  }

  approve(data_id, prefix, payload): Observable<any> {
    return this.apiService
      .put_py(
        '/' + prefix + '/' + data_id + '/approve',
        payload,
      ).map(data => data);
  }

  reject(data_id, prefix, payload): Observable<any> {
    return this.apiService
      .put_py(
        '/' + prefix + '/' + data_id + '/reject',
        payload,
      ).map(data => data);
  }

  show_approval(id): Observable<DefaultResponse<ResponseApproval<any>>> {
    return this.apiService.get_py(`/approval/${id}`)
      .map(data => data);
  }
}
