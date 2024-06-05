import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Location } from '@angular/common';

@Injectable()
export class InboxService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };

    this.location.replaceState('pages/inbox/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService
      .get_py(
        '/inbox',
        params,
      ).map(data => data);
  }
}
