import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

class AlertData {
  public data: any;
  public error: number;
  public message: string;
}

@Injectable()
export class AlertService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  indexDatatables(payload, module): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      category: 'alert',
      type: 'web',
      job_category: module,
    };

    this.location.replaceState('pages/alert/' + module + '/index/page',
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

}
