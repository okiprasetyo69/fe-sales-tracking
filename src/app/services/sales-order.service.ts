import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

@Injectable()
export class SalesOrderService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  index(): Observable<any> {
    return this.apiService.get(`/sales_order`)
      .map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post(
        '/sales_order',
        {body: payload},
      ).map(data => data);
  }

  show(code): Observable<any> {
    return this.apiService.get_py(`/sales/order/${code}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put(
        '/sales_order/' + id,
        {body: payload},
      ).map(data => data);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService
      .upload_py('/sales/order/import', formData);
  }

  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
    };
    this.location.go('pages/sales/activities/sales_order/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService.get_py(
      '/sales/order',
      params,
    ).map(data => data);
  }
}
