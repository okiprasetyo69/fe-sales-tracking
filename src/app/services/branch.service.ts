import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { dropdown_limit } from '../configs/configs';

@Injectable()
export class BranchService {

  constructor(
    private apiService: ApiService,
    private location: Location,
  ) {
  }

  index(): Observable<any> {
    return this.apiService.get(`/branch`)
      .map(data => data);
  }

  index_dropdown(term = ''): Observable<any> {
    return this.apiService.get_py(`/branches`, {
      page: 1,
      limit: dropdown_limit.max,
      search: term,
      order_by_column: 'name',
      order_direction: 'asc',
    }).map(data => data);
  }

  store(payload): Observable<any> {
    return this.apiService
      .post_py(
        '/branches',
        payload,
      ).map(data => data);
  }

  show(id): Observable<any> {
    return this.apiService.get_py(`/branches/${id}`)
      .map(data => data);
  }

  update(payload, id): Observable<any> {
    console.info('Payload updatenya : ', payload);
    return this.apiService
      .put_py(
        '/branches/' + id,
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

    this.location.replaceState('pages/settings/branch/index/page',
      'start=' + payload.start +
      '&length=' + payload.length +
      '&search=' + payload.search.value +
      '&order_col=' + payload.order[0].column +
      '&order_dir=' + payload.order[0].dir);

    return this.apiService
      .get_py(
        '/branches',
        params,
      ).map(data => data);
  }

  // listArea_() {
  //   return this.apiService.get_py(`/area?page=1&limit=50`)
  //     .map(data => data);
  // }

  listArea(): Observable<any> {
    return this.apiService.get_py(`/area`, {
      page: 1,
      limit: dropdown_limit.max,
      order_by_column: 'name',
      order_direction: 'asc',
    }).map(data => data);
  }

  save(payload, id) {
    if (!!id) {
      return this.update(payload, id);
    } else {
      return this.store(payload);
    }
  }

  delete(id): Observable<any> {
    return this.apiService
      .delete_py(
        '/branches/' + id,
      ).map(data => data);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService
      .upload_py('/branches/import', formData);
  }
}
