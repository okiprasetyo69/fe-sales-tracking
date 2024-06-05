import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

@Injectable()
export class InvoiceService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) { }

  show(id): Observable<any> {
    return this.apiService.get_py(`/sales/invoice/${id}`)
      .map(data => data);
  }

  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };

    this.location.replaceState('pages/sales/activities/invoice/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService.get_py(
        '/sales/invoice',
        params,
    ).map(data => data);
  }
}
