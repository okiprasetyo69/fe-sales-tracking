import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { dropdown_limit } from '../configs/configs';

@Injectable()
export class VisitCycleService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  index(): Observable<any> {
    return this.apiService.get(`/visit_cycle`)
      .map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/visit/cycle',
        payload,
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/visit/cycle/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put_py(
        '/visit/cycle/' + id,
        payload,
      ).map(data => data);
  }

  indexByModule(module): Observable<any> {
    return this.apiService.get(`/visit_cycle/module/${module}`)
      .map(data => data);
  }

  indexByGroups(module): Observable<any> {
    return this.apiService.get(`/visit_cycle_groups`)
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

    this.location.replaceState('pages/sales/visit_cycle/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService
      .get_py(
        '/visit/cycle',
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

  generate_route(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/route/generate',
        payload,
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
      .get_py('/user/sales',
        params,
      ).map(data => data);
  }

  delete(id): Observable<any> {
    return this.apiService.delete_py(
      '/visit/cycle/' + id,
    ).map(data => data);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService
      .upload_py('/visit/cycle/import', formData);
  }
}
