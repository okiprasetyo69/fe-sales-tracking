import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { dropdown_limit } from '../configs/configs';


@Injectable()
export class DivisionsService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  index(): Observable<any> {
    return this.apiService.get(`/division`)
      .map(data => data);
  }

  index_dropdown(): Observable<any> {
    return this.apiService.get_py(`/division`, {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'division_name',
      order_direction: 'asc',
    }).map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/division',
        payload,
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/division/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    return this.apiService
      .put_py(
        '/division/' + id,
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

    this.location.replaceState('pages/settings/divisions/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService
      .get_py(
        '/division',
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

  listByIds(ids): Observable<any> {
    return this.apiService.get_py(
      '/division',
      {list: ids},
    ).map(data => data);
  }

  delete(id): Observable<any> {
    return this.apiService
      .delete_py(
        '/division/' + id,
      ).map(data => data);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService
      .upload_py('/division/import', formData);
  }
}
