import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';


@Injectable()
export class PaymentService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/sales/payment/${id}`)
      .map(data => data);
  }

  showConfirmation(id): Observable<any> {
    return this.apiService.get_py(`/sales/payment/mobile/${id}`)
      .map(data => data);
  }

  indexDatatables(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      type: 'web',
    };

    // pages/sales/activities/payment/index/page
    this.location.replaceState('pages/sales/activities/payment/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir +
      '&type=' + 'web');

    return this.apiService
      .get_py(
        '/sales/payment',
        params,
      ).map(data => data);
  }


  indexDatatablesConfirmation(payload): Observable<any> {
    const params = {
      page: (payload.start / payload.length) + 1,
      limit: payload.length,
      search: payload.search.value,
      order_by_column: payload.columns[payload.order[0].column].data,
      order_direction: payload.order[0].dir,
      type: 'web',
    };

    // 'pages/sales/activities/payment/index/page'
    this.location.replaceState('pages/sales/activities/payment/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir +
      '&type=' + 'web');

    return this.apiService.get_py(
      '/sales/payment/mobile',
      params,
    ).map(data => data);
  }

  confirm(id): Observable<any> {
    return this.apiService
      .put_py(
        '/sales/payment/mobile/' + id,
        {
          is_confirm: 1,
        },
      ).map(data => data);
  }

  cancel(id): Observable<any> {
    return this.apiService
      .put_py(
        '/sales/payment/mobile/' + id,
        {
          is_canceled: 1,
        },
      ).map(data => data);
  }


  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService
      .upload_py('/sales/payment/import', formData);
  }

  checkReceipt(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/print/unique/code/check',
        payload,
      ).map(data => data);
  }
}
