import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

@Injectable()
export class RequestOrderService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  index(): Observable<any> {
    return this.apiService.get(`/request_order`)
      .map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post(
        '/request_order',
        {body: payload},
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/sales/request/${id}?type=web`)
      .map(data => data);
  }

  productList(id): Observable<any> {
    return this.apiService.get_py(`/sales/request/${id}/product`).map(data => data);
  }

  requestOrderImage(id): Observable<any> {
    return this.apiService.get_py(`/sales/request/${id}/image`).map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put(
        '/request_order/' + id,
        {body: payload},
      ).map(data => data);
  }

  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };
    this.location.go('pages/sales/activities/request_order/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);
    return this.apiService
      .get_py(
        '/sales/request',
        params,
      ).map(data => data);
  }
}
