import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { dropdown_limit } from '../configs/configs';

// @TODO change end point to delivery cycle

@Injectable()
export class DeliveryCycleService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) { }

  store(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/delivery/cycle',
        payload,
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/delivery/cycle/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put_py(
        '/delivery/cycle/' + id,
        payload,
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

    this.location.replaceState('pages/logistic/delivery_cycle/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService
      .get_py(
        '/delivery/cycle',
        params,
      ).map(data => data);
  }

  save(payload, id) {
    if (!!id) {
      return this.update(payload, id);
    } else {
      return this.store(payload);
    }
  }

  delete(id): Observable<any> {
    return this.apiService.delete_py(
      '/delivery/cycle/' + id,
    ).map(data => data);
  }

  dropdownUser() {
    const params = {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'create_date',
      order_direction: 'desc',
    };
    return this.apiService
      .get_py('/user/logistic',
        params,
      ).map(data => data);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService
      .upload_py('/delivery/cycle/import', formData);
  }

}
